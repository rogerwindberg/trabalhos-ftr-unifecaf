# 📘 Fundamentos de No-code e Low-code

---

### 🔍 Descrição do Desafio
Desenvolvimento de um **sistema de gerenciamento de tarefas e comunicação interna** para uma empresa utilizando a plataforma **Bubble**. A solução foi criada de forma visual e com lógica integrada, aproveitando as vantagens do paradigma **No-code/Low-code**.

---

### 🛠️ Ferramenta Utilizada
- **Bubble**: desenvolvimento visual e lógico
- **Ambiente**: testes na própria plataforma e publicação via plano Free Trial

---

### 💾 Estrutura do Banco de Dados
Foram definidos três _Data Types_ principais:

1. **User**
	 - Armazena usuários do sistema.
	 - Guarda referências às tarefas criadas e às que estão atribuídas.

2. **Task**
	 - Contém informações da tarefa: título, descrição, criador, responsável, status e data limite.

3. **Comment**
	 - Guarda comentários feitos nas tarefas.
	 - Vinculado ao ID da `Task` para exibição segmentada por tarefa.

---

### ✅ Funcionalidades Principais
- **Gestão de Tarefas**
	- Criar, editar e excluir tarefas.
	- Preenchimento de título, descrição, atribuição, status e prazo.
	- Exibição imediata no quadro (_board_) com dados essenciais.

- **Comentários**
	- Inserir, editar e remover comentários associados a cada tarefa.
	- Atualização instantânea da interface para refletir alterações.

- **Fluxo de Usuário**
	- Usuário já logado ou novo cadastrado pode operar o sistema.
	- Ações atualizam o banco e a interface em tempo real.

---

### 📊 Observações e Boas Práticas
- Apesar da alta produtividade proporcionada pelo No-code, o desenvolvimento tradicional oferece maior **flexibilidade**.
- **Backups**, controle de versões e métricas de desempenho são práticas disponíveis no Bubble, estimulando a disciplina de projetos tradicionais.

---

### 🚀 Publicação
O projeto foi testado no ambiente do Bubble e disponibilizado através do **Free Trial**.

---

✨ Aproveite o ganho de produtividade proporcionado pelo Bubble e experimente a simplicidade de construir soluções sem precisar programar manualmente!