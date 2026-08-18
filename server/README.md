# Backend para Portal de Segurança no Trabalho

Este diretório contém uma implementação mínima de backend (Node + Express + SQLite) para colocar a autenticação no servidor e gerenciar denúncias de forma mais segura.

Principais características
- Autenticação com senhas hasheadas (bcrypt)
- Tokens JWT emitidos no cookie HttpOnly
- Controle de permissões por papel (leader/admin/visitor)
- Endpoints REST para listar, criar, atualizar e deletar denúncias
- Seed inicial com contas fornecidas e denúncias de exemplo

Como rodar localmente
1. Entre na pasta server
2. Instale dependências: npm install
3. Crie um arquivo .env com pelo menos JWT_SECRET (opcional)
4. Rode: npm start
5. O servidor roda em http://localhost:4000 por padrão e serve o conteúdo estático do repositório na raiz (útil para desenvolvimento do painel /admin)

Notas de segurança
- Troque JWT_SECRET em produção e use HTTPS (secure cookie)
- Considere armazenar o banco fora do repo, usar um banco gerenciado e não seedar contas em produção

