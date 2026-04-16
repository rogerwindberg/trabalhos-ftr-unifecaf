import os

def limpar_tela():
    """Limpa o terminal. Compatível com Windows, Mac e Linux."""
    os.system('cls' if os.name == 'nt' else 'clear')

def pausar():
    """Cria uma pausa para o usuário ler o resultado antes de limpar a tela."""
    input("\n[Pressione ENTER para voltar ao menu principal...]")

pecas_aprovadas = []
pecas_reprovadas = []
ultimo_id_cadastrado = None

def validar_peca(peso, cor, comprimento):
    """Verifica se a peça atende aos critérios de qualidade."""
    motivos_reprovacao = []
    
    if not (95 <= peso <= 105):
        motivos_reprovacao.append(f"Peso fora do padrão ({peso}g)")
    if cor.lower() not in ['azul', 'verde']:
        motivos_reprovacao.append(f"Cor inválida ({cor})")
    if not (10 <= comprimento <= 20):
        motivos_reprovacao.append(f"Comprimento fora do padrão ({comprimento}cm)")
        
    return motivos_reprovacao

def cadastrar_peca():
    global ultimo_id_cadastrado
    print("--- CADASTRO DE NOVA PEÇA ---\n")

    if ultimo_id_cadastrado is not None:
        print(f"Último ID cadastrado: {ultimo_id_cadastrado}\n")
    else:
        print("Nenhum ID cadastrado ainda.\n")

    try:
        id_peca = input("ID da Peça: ")
        peso = float(input("Peso (g): "))
        cor = input("Cor (azul/verde): ")
        comprimento = float(input("Comprimento (cm): "))
        
        motivos = validar_peca(peso, cor, comprimento)
        
        peca = {
            "id": id_peca,
            "peso": peso,
            "cor": cor,
            "comprimento": comprimento
        }
        
        print("\nProcessando...\n")
        
        if len(motivos) == 0:
            pecas_aprovadas.append(peca)
            ultimo_id_cadastrado = id_peca
            print("Peça APROVADA e armazenada na caixa!")
            
            if len(pecas_aprovadas) % 10 == 0:
                print(f"CAIXA FECHADA! Total de caixas prontas: {len(pecas_aprovadas) // 10}")
        else:
            peca["motivos"] = motivos
            pecas_reprovadas.append(peca)
            ultimo_id_cadastrado = id_peca
            print("Peça REPROVADA. Motivo(s):")
            for m in motivos:
                print(f"   - {m}")
            
    except ValueError:
        print("\nErro: Digite valores numéricos válidos para peso e comprimento.")

def listar_pecas():
    print("--- LISTAGEM DE PEÇAS ---\n")
    
    print("PEÇAS APROVADAS:")
    if not pecas_aprovadas:
        print("   Nenhuma peça aprovada até o momento.")
    else:
        for p in pecas_aprovadas:
            print(f"   ID: {p['id']} | Peso: {p['peso']}g | Cor: {p['cor']} | Comp: {p['comprimento']}cm")
        
    print("\nPEÇAS REPROVADAS:")
    if not pecas_reprovadas:
        print("   Nenhuma peça reprovada até o momento.")
    else:
        for p in pecas_reprovadas:
            print(f"   ID: {p['id']} | Motivo(s): {', '.join(p['motivos'])}")

def remover_peca():
    print("--- REMOVER PEÇA ---\n")
    id_remover = input("Digite o ID da peça que deseja remover: ")
    
    for peca in pecas_aprovadas:
        if peca["id"] == id_remover:
            pecas_aprovadas.remove(peca)
            print("\nPeça removida da lista de APROVADAS.")
            return
            
    for peca in pecas_reprovadas:
        if peca["id"] == id_remover:
            pecas_reprovadas.remove(peca)
            print("\nPeça removida da lista de REPROVADAS.")
            return
            
    print("\nPeça não encontrada no sistema.")

def listar_caixas():
    print("--- STATUS DE ARMAZENAMENTO ---\n")
    total_caixas = len(pecas_aprovadas) // 10
    pecas_sobrando = len(pecas_aprovadas) % 10
    
    print(f"Caixas totalmente fechadas (10 peças): {total_caixas}")
    print(f"Peças na caixa atual em uso: {pecas_sobrando}/10")

def gerar_relatorio():
    print("="*40)
    print("RELATÓRIO FINAL CONSOLIDADO")
    print("="*40)
    print(f"Total de peças aprovadas:  {len(pecas_aprovadas)}")
    print(f"Total de peças reprovadas: {len(pecas_reprovadas)}")
    print(f"Total de caixas fechadas/utilizadas:  {len(pecas_aprovadas) // 10}")
    
    if len(pecas_reprovadas) > 0:
        print("\nDetalhamento das Reprovações:")
        for p in pecas_reprovadas:
            print(f" - ID {p['id']}: {', '.join(p['motivos'])}")
    print("="*40)

while True:
    limpar_tela()
    print("="*35)
    print("SISTEMA DE CONTROLE DE PRODUÇÃO")
    print("="*35)
    print("[1] Cadastrar nova peça")
    print("[2] Listar peças aprovadas/reprovadas")
    print("[3] Remover peça cadastrada")
    print("[4] Listar caixas fechadas")
    print("[5] Gerar relatório final")
    print("[0] Sair")
    print("="*35)
    
    opcao = input("\nEscolha uma opção: ")
    
    if opcao == '0':
        limpar_tela()
        print("Encerrando o sistema... Até logo!")
        break
        
    limpar_tela()
    
    if opcao == '1':
        cadastrar_peca()
        pausar()
    elif opcao == '2':
        listar_pecas()
        pausar()
    elif opcao == '3':
        remover_peca()
        pausar()
    elif opcao == '4':
        listar_caixas()
        pausar()
    elif opcao == '5':
        gerar_relatorio()
        pausar()
    else:
        print("Opção inválida. Tente novamente.")
        pausar()