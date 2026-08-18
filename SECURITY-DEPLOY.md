# Alterações de segurança e implantação

Implementei um backend Express+SQLite para hospedar autenticação e gerenciamento de denúncias:

- As senhas agora são armazenadas como hashes (bcrypt) no banco de dados (server/data.sqlite).
- O login retorna um JWT guardado em cookie HttpOnly para reduzir risco de XSS vazar o token.
- Endpoints REST fornecem operações CRUD com checagem de papel (role): leader/admin/visitor.

Como implantar profissionalmente
1. Não rode este serviço em GitHub Pages; GitHub Pages é apenas para páginas estáticas. Use uma plataforma para Node.js (Render, Fly.io, Heroku, Vercel com serverless functions, um VPS, etc.).
2. Configure variáveis de ambiente (JWT_SECRET) e HTTPS (cookie secure flag).  
3. Use um banco persistente/gerenciado em produção (Postgres, MySQL) e não o arquivo SQLite no repositório.

Passos recomendados imediatos
- Rotacionar senhas que foram expostas anteriormente (forneci instruções e removi o arquivo data/users.json do conteúdo padrão).  
- Criar um deploy em ambiente seguro e configurar HTTPS.  
- Habilitar logging, backups do banco e monitoramento.

Se quiser, eu posso:
- Implementar deploy com Docker + workflow do GitHub Actions;
- Migrar o banco para Postgres e criar scripts de migração;
- Adicionar UI para criação/edição/solução de denúncias com permissões por role.
