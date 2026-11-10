const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
  const url = match[1];
  if (!/^(?:https?:|data:|#|mailto:)/i.test(url)) {
    assert.ok(fs.existsSync(path.resolve(root, url)), `Recurso ausente: ${url}`);
  }
}
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(match => !/\bsrc\s*=/.test(match[1])).map(match => match[2]).join('\n');
assert.ok(scripts.includes('function createEvent'), 'Código da aplicação ausente');

class Element {
  constructor() {
    this.value = '';
    this.children = [];
    this.style = {};
    this.listeners = {};
    const classes = new Set();
    this.classList = {
      add: name => classes.add(name), remove: name => classes.delete(name),
      contains: name => classes.has(name),
      toggle: name => classes.has(name) ? classes.delete(name) : classes.add(name)
    };
  }
  set innerHTML(value) { this.markup = value; this.children = []; }
  get innerHTML() { return this.markup || ''; }
  appendChild(child) { this.children.push(child); }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  setAttribute(name, value) { this[name] = value; }
  querySelectorAll() {
    return this.children.flatMap(label => label.children).filter(input => input.checked);
  }
}
const elements = new Map();
const element = id => {
  if (!elements.has(id)) elements.set(id, new Element());
  return elements.get(id);
};
const storage = new Map();
const alerts = [];
const document = {
  getElementById: element, createElement: () => new Element(),
  querySelectorAll: () => [], querySelector: element, body: new Element()
};
const context = vm.createContext({
  document, window: { jspdf: { jsPDF: function () {} } },
  localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  alert: message => alerts.push(message), confirm: () => true, console
});
new vm.Script(scripts, { filename: 'index.html:inline' }).runInContext(context);
const run = code => vm.runInContext(code, context);
element('event-name').value = 'Teste local';
element('event-description').value = 'Dados fictícios';
run('createEvent()');
assert.equal(JSON.parse(storage.get('rachaAiEvents'))[0].name, 'Teste local');
for (const name of ['Ana', 'Bruno', 'Carla']) {
  element('participant-name').value = name;
  run('addParticipant()');
}
element('expense-desc').value = 'Almoço';
element('expense-amount').value = '90';
element('expense-payer').value = 'Ana';
run('addExpense()');
const balances = JSON.parse(run('JSON.stringify(calculateBalancesForExport())'));
assert.deepEqual(balances, { Ana: 60, Bruno: -30, Carla: -30 });
const settlements = JSON.parse(run('JSON.stringify(calculateSettlementsForExport(calculateBalancesForExport()))'));
assert.equal(settlements.length, 2);
assert.equal(settlements.reduce((total, item) => total + item.amount, 0), 60);
assert.ok(settlements.every(item => item.to === 'Ana'));
const saved = JSON.parse(storage.get('rachaAiEvents'))[0];
assert.equal(saved.participants.length, 3);
assert.equal(saved.expenses[0].amount, 90);
assert.deepEqual(alerts, []);
console.log('OK: referências, sintaxe, inicialização, evento, participantes, despesa, saldos, acertos e persistência.');
