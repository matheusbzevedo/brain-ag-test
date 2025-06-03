## 🛠️ Como rodar localmente

### Pré-requisitos

- Node.js `v22+`
- Docker + Docker Compose

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/matheusbzevedo/brain-ag-test.git
cd brain-ag-test
```

2. Instale as dependências

```bash
pnpm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

4. Execute o build

```bash
pnpm build
```

5. Rode a aplicação:

```bash
pnpm start:debug
```

### Docker

```bash
docker compose up --build
```
