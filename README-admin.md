Admin simples para o Portal de Segurança no Trabalho

O que foi adicionado:
- /admin/index.html - painel de administração (login + lista de denúncias)
- /admin/admin.js - lógica cliente para autenticação e exibição
- /admin/admin.css - estilos básicos
- /data/reports.json - arquivo JSON com denúncias de exemplo
- /data/users.json - 3 contas de desenvolvedores com senhas (texto plano)

Credenciais criadas (usuário / senha):
- dev-ana / Passw0rd!23
- dev-bruno / S3gur@123
- dev-carlos / D3v#2026

Como usar (modo rápido):
1. Abra https://<seu-usuario>.github.io/seguranca-trabalho/admin/ (se estiver usando GitHub Pages) ou rode um servidor local (ex.: `npx http-server` no diretório do repositório) e acesse `/admin/`.
2. Faça login com uma das contas acima. O painel mostrará as denúncias presentes em `data/reports.json`.

Importante — segurança:
- Esta implementação verifica usuário/senha no cliente carregando `data/users.json` em texto plano. Isso é INSEGURO e adequado apenas para protótipo/local.
- Para produção, implemente autenticação no servidor (ex.: Express + banco de dados), armazene senhas com hash (bcrypt) e proteja rotas com sessões/ JWT.

Posso:
- Mudar para uma implementação com servidor Node.js (Express) e senhas com hash (bcryptjs);
- Criar páginas para criar/editar denúncias e marcar como resolvidas;
- Integrar com um banco de dados (SQLite, Postgres) ou usar arquivos JSON com endpoints protegidos.

Diga qual próxima ação prefere.
