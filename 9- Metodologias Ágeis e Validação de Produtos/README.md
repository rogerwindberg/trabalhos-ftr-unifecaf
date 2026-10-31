# 🚀 Clara: Auditoria de Linguagem Inclusiva com IA

**Case de Product Discovery e Validação de Produto**

*Disciplina: Metodologias Ágeis e Validação de Produtos (UniFECAF)*

## 📌 1. Visão Geral do Projeto

Este projeto tem como objetivo validar um problema real no mercado de produtos digitais utilizando princípios de **Agile, Lean Startup e Product Discovery**. Em vez de desenvolver uma solução complexa do zero, o foco foi estruturar o menor experimento possível (MVP) para testar hipóteses, recolher evidências com utilizadores reais e aprender rápido.

**O Produto (Clara):** Um serviço assíncrono que utiliza IA para analisar rascunhos de textos de interfaces (UX Writing) e devolver um relatório de acessibilidade cognitiva e linguagem inclusiva.

## 🕵️‍♂️ 2. O Problema e a Oportunidade

* **O Problema:** Empresas frequentemente publicam interfaces focadas num "utilizador padrão", ignorando jargões, ambiguidades e textos complexos. Isso gera **barreiras cognitivas** que excluem utilizadores e dificultam a jornada.

* **A Oportunidade:** Democratizar a "revisão com olhar inclusivo" antes do lançamento, utilizando automação para que a inclusão seja um critério de projeto (e não um ajuste final).

## 💡 3. Nossas Hipóteses

* **Problema:** Times de produto não revisam a clareza cognitiva e a linguagem inclusiva por falta de tempo ou repertório técnico.

* **Solução:** Uma automação via e-mail, sem fricção de instalação de novos softwares, capaz de auditar textos e sugerir melhorias instantâneas resolverá essa dor.

* **Valor:** Profissionais de Produto/Design sentirão mais segurança ao aprovar telas e pouparão tempo com sugestões práticas.

## 🛠️ 4. O Experimento e o MVP

Para evitar desperdício de recursos, validamos a hipótese utilizando a técnica de **Automação/Mágico de Oz**.

**Arquitetura do MVP (No-Code/AI):**

1. **Entrada:** Formulário Web (Tally.so/Google Forms) onde o utilizador submete o seu texto de interface.

2. **Processamento:** Webhook via **n8n/Make** processa os dados e envia para a API do **Google Gemini**. O modelo foi instruído com um *System Prompt* focado em design inclusivo e redução de carga cognitiva.

3. **Saída:** A automação devolve o diagnóstico formatado diretamente para o e-mail (Gmail) do utilizador.

**Critério de Sucesso:** Pelo menos 3 dos 5 utilizadores de teste precisavam aprovar a utilidade do relatório gerado.

## 📊 5. Evidências e Resultados

O MVP foi partilhado com **5 profissionais reais** (Designers, PMs e Analistas).

*(* 🖼️ **Nota para o aluno:** Adicione aqui as imagens/prints das respostas do formulário, dos e-mails enviados e dos feedbacks recebidos no WhatsApp *)*

**Síntese dos Feedbacks Coletados:**

* **Padrão 1 (Valor percebido):** 4 dos 5 utilizadores afirmaram que as sugestões de reescrita foram muito úteis e reduziram termos técnicos excludentes.

* **Padrão 2 (Atrito no canal):** 2 utilizadores relataram que o e-mail é bom para testes, mas no dia a dia esqueceriam de abrir o formulário, sugerindo que a ferramenta existisse onde eles já trabalham (ex: Figma ou Slack).

* **Apoio da IA:** O Gemini foi utilizado durante o processo para ajudar a categorizar as respostas qualitativas e identificar estes padrões de forma ágil.

## 🎯 6. Aprendizados e Decisão Final

Comparando a hipótese inicial com os resultados encontrados, constatou-se que a **dor existe** e a **solução baseada em IA resolve o problema** de forma satisfatória. No entanto, o canal de entrega pode ser otimizado.

**Decisão: AJUSTAR (Pivotar Canal)**

> **Justificativa:** O valor do diagnóstico cognitivo foi validado (Critério de Sucesso atingido). Vamos **perseverar** com o motor de IA e a proposta de valor, mas vamos **ajustar** o canal de entrega nas próximas iterações. Em vez de e-mail, o próximo passo recomendado (V2) é transformar o prompt estruturado num plugin do Figma ou num bot de Slack, aproximando a ferramenta do ambiente natural de trabalho do utilizador.

### 💻 Ferramentas Utilizadas no Discovery

* **n8n Forms** (Interface de entrada)

* **n8n** (Orquestração e Automação)

* **Google Gemini API** (Motor de Análise de Inclusão)

* **Gmail SMTP** (Canal de Entrega)

* **ChatGPT/Gemini Web** (Apoio na estruturação das hipóteses e análise de dados)