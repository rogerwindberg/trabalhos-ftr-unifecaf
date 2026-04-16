# Sistema de Controle de Produção

## Explicação do Funcionamento

O **Sistema de Controle de Produção** é uma aplicação em Python que gerencia o cadastro, validação e armazenamento de peças manufaturadas. O sistema verifica se as peças atendem aos critérios de qualidade estabelecidos e as organiza em caixas de armazenamento.

### Critérios de Qualidade

As peças são validadas conforme os seguintes padrões:

- **Peso**: Entre 95g e 105g
- **Cor**: Azul ou Verde
- **Comprimento**: Entre 10cm e 20cm

Se algum critério não for atendido, a peça é reprovada e os motivos são registrados.

### Funcionalidades Principais

1. **Cadastrar nova peça**: Insere uma peça no sistema com ID, peso, cor e comprimento. O sistema valida automaticamente e aprova ou reprova a peça.

2. **Listar peças**: Exibe todas as peças aprovadas e reprovadas com seus detalhes.

3. **Remover peça**: Remove uma peça do sistema pelo seu ID.

4. **Listar caixas fechadas**: Mostra quantas caixas estão completamente fechadas (com 10 peças cada) e quantas peças estão na caixa atual.

5. **Gerar relatório final**: Apresenta um consolidado com totais de peças aprovadas, reprovadas e caixas utilizadas.

### Estrutura de Dados

- **Peças Aprovadas**: Lista com ID, peso, cor e comprimento
- **Peças Reprovadas**: Lista com ID, peso, cor, comprimento e motivos de reprovação
- **Último ID Cadastrado**: Controla o ID da última peça processada

---

## Como Rodar o Programa

### Pré-requisitos

- Python 3.x instalado no seu computador
- Acesso ao terminal/prompt de comando

### Passo a Passo

#### 1. Abra o terminal/prompt de comando

**Windows:**
- Pressione `Win + R`
- Digite `cmd` e pressione Enter

**Mac/Linux:**
- Abra a aplicação Terminal

#### 2. Navegue até a pasta do projeto

```bash
cd "c:\Users\DexTiger\Documents\trabalhos-ftr-unifecaf\3- Algoritmos e Lógica de Programação"
```

#### 3. Execute o arquivo Python

```bash
python sistema.py
```

Ou, se você tiver múltiplas versões de Python:

```bash
python3 sistema.py
```

#### 4. Interaja com o menu

Você verá o menu principal com as opções numeradas de 0 a 5. Digite o número correspondente à ação desejada e pressione Enter.

---

## Exemplos de Entradas e Saídas

### Exemplo 1: Cadastrar uma Peça Aprovada

**Entrada do usuário:**
```
Escolha uma opção: 1

ID da Peça: 01
Peso (g): 100.5
Cor (azul/verde): azul
Comprimento (cm): 15.5
```

**Saída esperada:**
```
--- CADASTRO DE NOVA PEÇA ---

Último ID cadastrado: 01

Processando...

Peça APROVADA e armazenada na caixa!
```

### Exemplo 2: Cadastrar uma Peça Reprovada

**Entrada do usuário:**
```
Escolha uma opção: 1

ID da Peça: 02
Peso (g): 110.0
Cor (azul/verde): vermelho
Comprimento (cm): 15.0
```

**Saída esperada:**
```
--- CADASTRO DE NOVA PEÇA ---

Último ID cadastrado: 02

Processando...

Peça REPROVADA. Motivo(s):
   - Peso fora do padrão (110.0g)
   - Cor inválida (vermelho)
```

### Exemplo 3: Listar Peças

**Entrada do usuário:**
```
Escolha uma opção: 2
```

**Saída esperada:**
```
--- LISTAGEM DE PEÇAS ---

PEÇAS APROVADAS:
   ID: 01 | Peso: 100.5g | Cor: azul | Comp: 15.5cm

PEÇAS REPROVADAS:
   ID: 02 | Motivo(s): Peso fora do padrão (110.0g), Cor inválida (vermelho)
```

### Exemplo 4: Listar Caixas Fechadas

**Entrada do usuário:**
```
Escolha uma opção: 4
```

**Saída esperada:**
```
--- STATUS DE ARMAZENAMENTO ---

Caixas totalmente fechadas (10 peças): 0
Peças na caixa atual em uso: 2/10
```

### Exemplo 5: Remover Peça

**Entrada do usuário:**
```
Escolha uma opção: 3

Digite o ID da peça que deseja remover: 01
```

**Saída esperada:**
```
--- REMOVER PEÇA ---

Peça removida da lista de APROVADAS.
```

### Exemplo 6: Gerar Relatório Final

**Entrada do usuário:**
```
Escolha uma opção: 5
```

**Saída esperada:**
```
========================================
RELATÓRIO FINAL CONSOLIDADO
========================================
Total de peças aprovadas:  1
Total de peças reprovadas: 1
Total de caixas fechadas/utilizadas:  0

Detalhamento das Reprovações:
 - ID 02: Peso fora do padrão (110.0g), Cor inválida (vermelho)
========================================
```

### Exemplo 7: Encerrar o Sistema

**Entrada do usuário:**
```
Escolha uma opção: 0
```

**Saída esperada:**
```
Encerrando o sistema... Até logo!
```

---