# Migrating Payload CMS from MongoDB to PostgreSQL

This guide outlines the process of migrating a Payload CMS project from MongoDB to PostgreSQL, enhancing the setup with Docker, environment configurations, and database adapter updates. Future sections will cover adding multi-tenancy and permissions.

---

## Step 1: Set Up PostgreSQL with Docker

### 1.1 Install and Configure Docker

Ensure Docker is installed on your system. This guide uses Docker to manage PostgreSQL and the Node.js environment.

### 1.2 Update `docker-compose.yml`

Replace the existing `docker-compose.yml` with the following configuration:

```yaml
version: '3'

services:
  postgres:
    image: postgres:15-alpine
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_DB=payload
      - POSTGRES_USER=payload
      - POSTGRES_PASSWORD=payload
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
  node_modules:
```

### 1.3 Add Docker Scripts to `package.json`

Include these scripts in your `package.json` for Docker management:

```json
"scripts": {
  "pg:up": "docker-compose up -d",
  "pg:down": "docker-compose down",
  "pg:build": "docker-compose up --build"
}
```

---

## Step 2: Configure Environment Variables

Update your `.env` file with PostgreSQL details:

```env
DATABASE_URI=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
PAYLOAD_SECRET=payload_secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CRON_SECRET=cron_secret
PREVIEW_SECRET=preview_secret

POSTGRES_DB=payload
POSTGRES_USER=payload
POSTGRES_PASSWORD=payload
```

---

## Step 3: Update Project Dependencies

### 3.1 Remove MongoDB Dependencies

```bash
pnpm remove mongoose
```

### 3.2 Install PostgreSQL Adapter

```bash
pnpm add @payloadcms/db-postgres
```

### 3.3 Configure `payload.config.ts`

Update your database configuration in `src/payload.config.ts`:

```typescript
import { postgresAdapter } from '@payloadcms/db-postgres'

const config = buildConfig({
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  // ... other configurations
})
```

---

## Step 4: Run the Project

1. Start PostgreSQL and the application:

```bash
pnpm pg:up
```

2. Launch the development server:

```bash
pnpm dev
```

---

## Additional Notes

- **Backup Data**: Always backup MongoDB data before migration.
- **Persistent Data**: PostgreSQL data persists in the `postgres_data` volume.
- **Customization**: Adjust database credentials via environment variables.
- **Access**: PostgreSQL is accessible at `localhost:5432` or `postgres:5432` within Docker.

---

## Future Enhancements

### Multi-Tenancy

To be added: Instructions on implementing multi-tenancy using PostgreSQL schemas.

### Permissions

To be added: Guidance on setting up role-based access control.

---

## Conclusion

This guide helps transition your Payload CMS from MongoDB to PostgreSQL, leveraging Docker for a streamlined environment. Future updates will cover multi-tenancy and advanced permissions.