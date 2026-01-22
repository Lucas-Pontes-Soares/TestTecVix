# Teste Técnico Vituax - Lucas Pontes Soares

## 📋 Sumário

- [Sobre Mim](#sobre-mim)
   - [Contato](#contato)
- [Principais Modificações](#sobre-o-teste)
- [Soluções](#️-importante-como-entregar-o-teste)
- [Credenciais](#objetivos)

---

## 🪪 Sobre Mim

Sou Lucas Pontes Soares, **Desenvolvedor Full-Stack Júnior** com quase **2 anos de experiência** em **Node.JS**, **React.JS** e gerenciamento de bancos de dados **SQL**.

Habilidade em automação de processos e desenvolvimento de agentes de **IA**.

Com o objetivo em especializar em **Back-end**, busco posição profissional focado em entregar soluções robustas, otimizar processos e contribuir ativamente para o sucesso da equipe.

### 📞 Contato

- 📞 Celular: (14) 98219-7061
- ✉️ Email: <lucasps.dev@outlook.com>
- 👨‍💼 Linkedin: https://www.linkedin.com/in/lucas-pontes-soares/
- 📚 Portfolio: https://lucas-pontes-soares.github.io/portfolio/

## 💡 Principais Modificações

- ➕ CRUD dos usuários;
- ⚒️ Fiz Diagrama do banco de dados Diagrama de Entidade-Relacionamento (DER). Está localizado em backend > prisma > dbdiagram
- 🔒 Criptografia de senhas utilizando a biblioteca: bcryptjs;
- 🪪 Implementação de tokens JWT que expiram em 1 dia;
- 👤 Ao registrar conta de usuário, automaticamente já é logado e retornado o tokenJWT;
- ⏺️ Botão na tela de login para redirecionar para a tela de registro;
- 💻 Tela de login e registrar estavam com o componente Contato de forma diferente, ajustado;
- 📦 Dados do usuário, e token, sendo salvos no localStorage;
- ➕ Campos de senha (criptografado) e localização adicionados na VM;

## 📖 Soluções

- 👤 Para criar a conta e ao mesmo tempo já logar, criei uma rota especifica na api "/user/register" que chama a função para criar um usuário, se tudo certo, ele chama a função de logar. Retornando o usuario e o token. Economizando cliques e tempo do usuário;
- ⚒️ Para construir o Diagrama de Entidade-Relacionamento (DER), utilizei o app Draw.io, resolvi fazer isso para ter melhor entendimento de como funciona o banco de dados, e os relacionamentos e tipos, uma boa prática;