Admin simples para o Portal de Segurança no Trabalho

O que foi adicionado:
- /admin/index.html - painel de administração (login + lista de denúncias)
- /admin/admin.js - lógica cliente (carrega users.json e reports.json, autentica no cliente e exibe denúncias)
- /admin/admin.css - estilos básicos
- /data/reports.json - arquivo JSON com denúncias de exemplo
- /data/users.json - contas de desenvolvedores/administradores e conta de visitante de teste (texto plano)

Credenciais criadas (usuário / senha / papel):
- gabriel-lima / LiderPass!2026 / leader (Gabriel Lima — Líder)
- dayllon-kauan / AdmDK#2026 / admin (Dayllon Kauan — Administrador)
- adryan-kaue / AdmAK#2026 / admin (Adryan Kaue — Administrador)
- visitante-teste / Visita2026 / visitor (Conta apenas para visualizar denúncias)

Como usar (modo rápido):
1. Abra https://<seu-usuario>.github.io/seguranca-trabalho/admin/ (se estiver usando GitHub Pages) ou rode um servidor local (ex.: `npx http-server` no diretório do repositório) e acesse `/admin/`.
2. Faça login com uma das contas acima. O painel mostrará as denúncias presentes em `data/reports.json`.

Observação sobre permissões na UI:
- Atualmente o painel é apenas leitor de denúncias; todas as contas que efetuarem login conseguem ver as denúncias. A conta "visitante-teste" foi criada apenas para simular um usuário que só precisa visualizar denúncias. Se você quiser, eu atualizo o código para ocultar/mostrar controles baseado no `role` (por exemplo, bloquear criação/edição para visitors).

Importante — segurança:
- Esta implementação verifica usuário/senha no cliente carregando `data/users.json` em texto plano. Isso é INSEGURO e adequado apenas para protótipo/local.
- Para produção, implemente autenticação no servidor (ex.: Express + banco de dados), armazene senhas com hash (bcrypt) e proteja rotas com sessões/ JWT.

Próximos passos recomendados (posso implementar):
- Migrar autenticação para o servidor (Express) e armazenar senhas com hash (bcrypt).
- Implementar controle de permissões por papel (leader/admin/visitor) no backend e no frontend.
- Adicionar endpoints CRUD para denúncias com logging e histórico de resolução.

Diga qual próximo passo prefere que eu implemente.
