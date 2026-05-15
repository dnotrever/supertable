# Como publicar uma nova versão no npm

## Pré-requisitos

- Node.js instalado localmente
- Estar autenticado no npm: `npm login`

---

## Passo a passo

### 1. Faça as alterações na biblioteca

Edite os arquivos em `src/` (componentes, hooks, utils, estilos).

### 2. Compile a biblioteca

```bash
npm run build
```

Isso executa `tsc -p tsconfig.build.json && vite build` e gera os arquivos em `dist/`.

Verifique se `dist/` contém:
- `index.js`
- `index.d.ts`
- `super-table.css`

### 3. Atualize a versão

Edite o campo `"version"` no `package.json` seguindo o [Semantic Versioning](https://semver.org/):

| Tipo de mudança | Exemplo |
|-----------------|---------|
| Correção de bug (patch) | `0.0.3` → `0.0.4` |
| Nova funcionalidade compatível (minor) | `0.0.3` → `0.1.0` |
| Quebra de compatibilidade (major) | `0.0.3` → `1.0.0` |

Ou use o comando do npm:

```bash
npm version patch   # 0.0.3 -> 0.0.4
npm version minor   # 0.0.3 -> 0.1.0
npm version major   # 0.0.3 -> 1.0.0
```

### 4. Publique no npm

```bash
npm publish --access public
```

---

## Verificação pós-publicação

Confirme que a versão está disponível:

```bash
npm view @dnotrever2/super-table version
```

---

## Ambiente de desenvolvimento local (Docker)

O backend e o frontend de desenvolvimento rodam via Docker e **não fazem parte da biblioteca publicada** — servem apenas para testar a biblioteca localmente.

```bash
# Subir os serviços em background
docker compose up -d --build

# Frontend (dev com hot reload): http://localhost:9002
# Backend (API mock):             http://localhost:8002

# Ver logs
docker compose logs -f

# Derrubar
docker compose down
```

Após modificar `src/`, o frontend reflete as mudanças automaticamente via HMR do Vite.
