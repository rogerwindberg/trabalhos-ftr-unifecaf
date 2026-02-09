
# Workflow n8n — Instruções de Uso

**Visão Geral**

Este `README` descreve como usar o workflow do n8n que processa mensagens de chat e chama um agente de IA. O fluxo principal é:

- `When chat message received` → gatilho de chegada de mensagem
- `Edit fields` → define a variável `empresa` fornecida pelo usuário
- `AI Agent` → nó com prompt predefinido (ajustável)
- `Chat Model` → modelo da OpenAI conectado (configure de sua preferência)
- `Simple memory` → memória simples usada pelo agente

**Pré-requisitos**

- `n8n` instalado e acessível.
- Conta e credenciais da OpenAI configuradas no n8n (API Key).

**Instalação e Importação**

1. Abra seu painel do `n8n`.
2. Importe o workflow (JSON) fornecido ou recrie os nós conforme descrito.

**Configuração dos Nós**

- `Edit fields`:
	- Adicionar um valor para a variável `empresa`.
- `AI Agent`:
	- Contém o prompt principal que o agente seguirá. O prompt pode ser editado conforme necessidade (ver seção "Ajustando o Prompt").
	- Conecte a saída do `Edit fields` para que o prompt receba a variável `empresa`.

- `Chat Model`:
	- Configure com as credenciais da OpenAI.
	- Selecione o modelo desejado (por exemplo, `gpt-4o` ou `gpt-4`).

- `Simple memory`:
	- Ative para guardar contexto entre mensagens, se desejado.
	- Configure o tamanho de mensagens que devem ser guardadas para contexto.

**Como usar**
- Clique no botão `Open chat` na parte inferior da tela para abrir o chat;
- Insira o prompt inicial e envie a mensagem;
- O agente irá receber as informações e devolver a resposta.