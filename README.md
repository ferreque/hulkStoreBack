# HulkStore — Backend

REST API para el e-commerce HulkStore, construida con NestJS y TypeScript.

## Stack

- **NestJS 10** — framework principal
- **TypeScript 5** — tipado estático
- **MongoDB + Mongoose** — base de datos
- **JWT + Passport** — autenticación
- **bcryptjs** — hash de contraseñas
- **class-validator** — validación de DTOs

## Módulos

| Módulo       | Ruta base         | Descripción                          |
|--------------|-------------------|--------------------------------------|
| Auth         | `/api/auth`       | Login y renovación de token          |
| Users        | `/api/users`      | CRUD de usuarios                     |
| Products     | `/api/products`   | CRUD de productos                    |
| Categories   | `/api/categories` | CRUD de categorías                   |
| Orders       | `/api/orders`     | CRUD de pedidos                      |

## Roles

- `USER_ROLE` — acceso a catálogo y pedidos propios
- `ADMIN_ROLE` — acceso completo al panel de administración

## Instalación local

```bash
npm install
npm run dev
```

Crea un archivo `.env` en la raíz:

```env
MONGODB_CNN=mongodb+srv://usuario:password@cluster.mongodb.net/hulkstore
KEY=tu_jwt_secret
PORT=8080
```

## Scripts

| Comando         | Descripción                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Servidor de desarrollo con ts-node-dev   |
| `npm run build` | Compila TypeScript a `/dist`             |
| `npm run start` | Corre el build compilado                 |

## CI/CD

- **CI** (`ci.yml`) — corre en PRs y push a `develop`: compila TypeScript
- **CD** — Vercel despliega automáticamente en cada push a `main`

## Deploy

Hosteado en **Vercel** con `@vercel/node`. Las variables de entorno se configuran en el dashboard de Vercel.

Frontend: [frontHulkStore](https://github.com/ferreque/frontHulkStore)
