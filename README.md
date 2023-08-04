# pulse

https://pulse-hester.vercel.app/

# Project Description

`pulse` is a social media application, similar to Twitter, that allows users to create and share posts known as "beats" (similar to tweets). Users can engage with these beats by leaving comments and likes. The application demonstrates a wide array of technologies.

The application uses Hasura as its data API platform. It leverages most features of Hasura including migrations, seeds, actions, triggers, remote schemas, and authorization.
The front end is built using Next.js 13 with its new App Router and new/experimental packages from Apollo and Auth0.
The back end is built using Hasura and ASP.NET Core 7 with Minimal API and Hot Chocolate and uses OpenAI to generate random posts/comments.

Hasura is hosted on Hasura Cloud.
The database is PostgreSQL 15, hosted on Azure.
The API is hosted on Azure App Service.
The front end is hosted on Vercel.
The app is secured using Auth0.

## Getting Started

### Run Database, Hasura, and API in Docker

1. Install Docker Desktop (Windows)
   - https://www.docker.com/products/docker-desktop/
1. Install the Hasura CLI (Windows)
   - https://hasura.io/docs/latest/hasura-cli/install-hasura-cli/
   - On OSX, execute `brew install hasura-cli`.
1. Open a terminal and change directory to the `pulse` root directory.
1. Run `docker-compose up -d`.
1. `cd hasura`
   - Execute `hasura metadata apply`.
   - Execute `hasura seed apply`.

### Run the Next.js App

1. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
2. Open [http://localhost:3000](http://localhost:3000) with your browser

## Technologies

- Apollo Client
- ASP.NET Core
    - Minimal API
    - Rate Limiting
    - Swagger
    - JWT Bearer Auth
    - OAuth2
    - Health Checks
- Auth0
    - Actions
- Azure
    - App Service
    - Azure Database for PostgreSQL
- Dapper
- Docker
- GitHub Actions
- GraphQL Code Generator
- Hasura
    - Actions
    - Authorization (RBAC)
    - Event Triggers
        - TODO:
    - Cron Triggers
        - TODO: add a cron trigger to add random posts
    - Hasura Cloud
    - Migrations
    - Remote Schemas
    - Seeds
- Hot Chocolate
    - Table-level Subscriptions (Notification Service)
- Material UI
- Minimal API
- Next.js
- NodaTime
- Npgsql
- OpenAI
- PostgreSQL
    - pg_notify
- React
- Serilog
- Swagger
- Tailwind CSS
- Vercel

## Auth0

- How can I use the Management API in Actions?
    - https://community.auth0.com/t/how-can-i-use-the-management-api-in-actions/64947
    - Note: you also need to add the `read:roles` permission to the Auth0 Management API
