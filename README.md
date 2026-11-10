# Racha Aí

Aplicação web para dividir despesas de eventos entre participantes, calcular saldos e sugerir acertos.

[Acessar o aplicativo publicado](https://rachaai.netlify.app/)

## Funcionalidades

- Criação e exclusão de eventos com nome e descrição.
- Cadastro de participantes e despesas com pagante e grupo de divisão.
- Cálculo de saldos e sugestões de pagamentos entre participantes.
- Exportação do evento em JSON e relatórios em Excel e PDF.
- Tema claro e escuro, com interface responsiva.

## Executar localmente

O aplicativo é estático: não exige instalação de pacotes ou processo de build. Com Python 3 instalado, execute na pasta do projeto:

```bash
python -m http.server 8000
```

Abra http://localhost:8000. Também é possível abrir `index.html` diretamente, mas um servidor local fornece uma origem mais previsível para o armazenamento do navegador.

Internet é necessária para carregar as bibliotecas externas. Não é garantido funcionamento completo offline.

## Como usar

1. Crie um evento e adicione seus participantes.
2. Cadastre cada despesa, informe quem pagou e selecione quem participa da divisão.
3. Consulte saldos e sugestões de acerto.
4. Exporte JSON para guardar uma cópia dos dados, ou gere relatórios Excel/PDF.

Excluir um participante também exclui as despesas em que ele aparece. Limpar um evento remove seus participantes e despesas. Revise a confirmação antes de prosseguir.

## Armazenamento e privacidade

Os eventos ficam no `localStorage`, na chave `rachaAiEvents`; o tema usa a chave `theme`. Não há conta, sincronização entre dispositivos ou backend próprio no código recuperado.

Dados de `localhost`, arquivo local e site Netlify são separados pelo navegador. Abrir a cópia local não transfere os eventos salvos no site publicado. Limpar dados do navegador pode apagar os registros. O JSON exportado é uma cópia para arquivo; esta versão não possui importação de JSON pela interface.

## Estrutura

| Arquivo | Finalidade |
| --- | --- |
| `index.html` | Aplicativo completo, com estilos e lógica incorporados |
| `docs/RECUPERACAO.md` | Origem, integridade, análise e limitações |
| `tests/smoke.cjs` | Verificação básica da estrutura e dos cálculos |
| `package.json` | Atalho opcional para executar as verificações com Node.js |
| `LICENSE` | Licença existente no repositório |

## Bibliotecas externas

| Biblioteca | Versão referenciada | Uso |
| --- | --- | --- |
| Font Awesome | 6.4.0 | Ícones |
| jsPDF | 2.5.1 | Exportação PDF |
| jsPDF AutoTable | 3.5.28 | Tabelas no PDF |
| SheetJS / xlsx | 0.18.5 | Exportação Excel |

As bibliotecas são carregadas por CDN. As versões acima reproduzem o site recuperado e não representam uma atualização ou auditoria das dependências.

## Verificações

Com Node.js instalado, sem instalar dependências:

```bash
npm test
```

O teste verifica referências locais, sintaxe, inicialização em ambiente simulado, criação e persistência de evento e um cenário de divisão e acerto. Não substitui testes de navegador nem valida os arquivos PDF/Excel gerados.

## Recuperação e publicação

O `index.html` foi recuperado da resposta pública de https://rachaai.netlify.app/ em 10/11/2026. O arquivo preserva o código recebido, sem refatoração. Consulte [o registro da recuperação](docs/RECUPERACAO.md).

Esta recuperação não exige alterar o site existente. Nenhuma configuração de Netlify, domínio ou deploy foi adicionada. A branch de recuperação deve ser revisada antes de integração; uma integração em branch ligada à hospedagem pode disparar um deploy automático.

## Autoria

Criado por **Levant by Rebeca Moura**, conforme os créditos da aplicação. A licença existente foi preservada; bibliotecas externas mantêm suas próprias licenças.
