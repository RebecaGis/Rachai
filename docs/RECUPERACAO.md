# Registro de recuperação do Racha Aí

## Origem e integridade

- Fonte: https://rachaai.netlify.app/
- Data da coleta: 10/11/2026.
- Método: download da resposta HTML pública por HTTPS.
- SHA-256 dos bytes recebidos de `index.html`: `9acae8d28e07e0f1f0073908338293ac8791bf95a6f58e40ab70ceb5a9e75d41`.

O documento recebido contém CSS e JavaScript incorporados, além de quatro referências externas de bibliotecas. Não foram encontrados scripts, estilos ou imagens locais que precisem ser recuperados separadamente. O código da aplicação foi mantido sem alterações. Conversão de finais de linha pelo Git pode alterar o hash de uma cópia de trabalho; o hash acima registra os bytes da coleta original.

Não foram recuperados histórico de desenvolvimento, configurações da conta Netlify ou dados dos usuários. Dados de eventos são armazenados no navegador e não fazem parte do HTML público.

## Análise do código recuperado

O aplicativo implementa eventos, participantes, despesas, divisão igualitária dentro do grupo selecionado, saldos, acertos sugeridos e exportações JSON, Excel e PDF. As funções de exportação utilizam bibliotecas carregadas por CDN.

## Pontos para evolução

Estes pontos foram identificados por leitura do código; a recuperação não aplica correções de comportamento:

1. **Centavos:** a divisão usa ponto flutuante e arredondamento individual. Divisões não exatas podem deixar diferenças de um centavo; uma revisão deve definir distribuição de restos em centavos inteiros e unificar o cálculo da tela e das exportações.
2. **Carregamento:** a inicialização acessa `window.jspdf.jsPDF` diretamente. Falha na CDN pode interromper a aplicação inteira, mesmo quando o usuário não precisa exportar PDF.
3. **Dados locais:** o `JSON.parse` inicial não trata JSON inválido e a gravação não trata indisponibilidade ou limite do armazenamento.
4. **Renderização de entradas:** nomes, descrições e despesas aparecem em trechos montados com `innerHTML`. Convém usar nós de texto para conteúdo informado pelo usuário.
5. **Recuperação de dados:** há exportação JSON, mas não importação ou sincronização entre dispositivos.
6. **Dependências:** as versões de CDN foram preservadas. Atualizações precisam de avaliação e teste das exportações antes de publicação.

## Validação e limites

O teste automatizado usa o JavaScript real do HTML em um DOM simulado, sem carregar CDNs. Verifica referências locais, sintaxe, inicialização, persistência e cálculo de um cenário conhecido. Não comprova aparência, acessibilidade, compatibilidade de navegadores ou geração real de PDF/Excel.

Antes de um futuro deploy, testar em navegador: criação de eventos, seleção parcial de participantes, divisão com centavos, recarga da página, temas, exclusão e exportações. Os testes devem usar dados fictícios e uma origem separada da produção.
