# pulse

https://pulse-hester.vercel.app/

## Project Description

`pulse` is a social media application, similar to Twitter, that allows users to create and share posts known as "beats" (similar to tweets). 
Users can engage with these beats by leaving comments and likes. 
Data is updated in real-time, so you're able to see these engagements as they happen.

## How It Works

The application uses Hasura as its data API platform. 
It leverages most features of Hasura including migrations, seeds, actions, triggers, remote schemas, and authorization.
Hasura uses actions and remote schemas to connect with an ASP.NET Core 7 Web API which uses Minimal API and Hot Chocolate. 
This API handles custom business logic such as using OpenAI to generate random posts/comments and Quartz to schedule jobs to insert random comments/likes on inserted posts. 
The front end is built using Next.js 13 with its new App Router and new/experimental packages from Apollo and Auth0.

The front end uses Hasura live query subscriptions to update the UI in real-time.
When a beat is created, an event trigger will fire a webhook to the API.
This endpoint will use OpenAI to generate random comments and then use Quartz to schedule jobs to insert these random comments/likes to simulates real-time engagement with the beat.
Random beats will be generated using a cron trigger every 6 hours.

Hasura is hosted on Hasura Cloud.
The database is PostgreSQL 15, hosted on Azure.
The API is hosted on Azure App Service.
The front end is hosted on Vercel.
The app is secured using Auth0.

## Getting Started

### Create an Auth0 tenant

To run locally, you will either have to create an Auth0 tenant with the same setup as mine or attempt to disable auth.

My Auth0 tenant has:
1. A regular web application (Next.js)
1. An API
1. A machine-to-machine application with `read:users`, `read:roles`, and `update:roles` permissions to the Auth0 Management API
1. Two custom actions in the Login flow
    1. Assign role on first login (defined below)
    2. Enrich tokens (defined below)

### Create .env Files

Create the following .env files. Each .env file has a template file that you can copy and rename.
1. ~/pulse/.env
    - Used by `docker-compose.yml`
1. ~/pulse/hasura/.env
    - Used by Hasura CLI
1. ~/pulse/src/pulse-ui/.env.local
    - Used by Next.js

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
       - You will get the 'Metadata is inconsistent' warning since the database is empty.
   - Execute `hasura migrate apply`.
   - Execute `hasura metadata apply` again.
       - This will resolve the 'Metadata is inconsistent' warning.
   - Execute `hasura seed apply`.
1. Open [http://localhost:8081](http://localhost:8081) with your browser to view the Hasura console.
1. Open [http://localhost:5003/swagger/index.html](http://localhost:5003/swagger/index.html) with your browser to view Swagger.
1. Open [http://localhost:5003/graphql/](http://localhost:5003/graphql/) with your browser to view Banana Cake Pop.

### Run the Next.js App

1. Open a terminal and change directory to the `pulse` root directory.
1. `cd src/pulse-ui`
1. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
1. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
1. Open [http://localhost:3000](http://localhost:3000) with your browser

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
    - Next.js SDK
- Azure
    - App Service
    - Azure Database for PostgreSQL
- Bogus
- Dapper
- Docker
- GitHub Actions
- GraphQL Code Generator
- Hasura
    - Actions
    - Authorization (RBAC)
    - Event Triggers
    - Cron Triggers
    - Hasura Cloud
    - Migrations
    - Remote Schemas
    - Seeds
- Hot Chocolate
    - Table-level Subscriptions (Notification Service)
        - Note: the need to do this might be obsoleted by https://github.com/ChilliCream/graphql-platform/pull/6387
- Luxon
- Material UI
- Minimal API
- Next.js
- NodaTime
- Npgsql
- OpenAI
- PostgreSQL
    - pg_notify
- Quartz
- React
- Serilog
- Swagger
- Tailwind CSS
- TypeScript
- Vercel

## Resources

- How can I use the Management API in Actions?
    - https://community.auth0.com/t/how-can-i-use-the-management-api-in-actions/64947
    - Note: you also need to add the `read:roles` permission to the Auth0 Management API

## Auth0 Actions
1. Assign role on first login
    ```
    exports.onExecutePostLogin = async (event, api) => {
        if (event.stats.logins_count !== 1) {
        return;
        }

        const ManagementClient = require('auth0').ManagementClient;

        const management = new ManagementClient({
            domain: event.secrets.domain,
            clientId: event.secrets.clientId,
            clientSecret: event.secrets.clientSecret
        });

        const params =  { id : event.user.user_id};
        const data = { "roles" : ["rol_7OQ4PJQWyE0R0eQC"]};

        try {
        const res = await management.assignRolestoUser(params, data)
        } catch (e) {
        console.log(e)
        // Handle error
        }
    };
    ```
2. Enrich tokens
    ```
    exports.onExecutePostLogin = async (event, api) => {
        if (event.authorization){
        api.accessToken.setCustomClaim("user_id", event.user.user_id);
        api.accessToken.setCustomClaim("user_name", event.user.name);
        api.accessToken.setCustomClaim("user_email", event.user.email);

        const hasuraClaims = {
            "x-hasura-user-id": event.user.user_id
        };

        let roles;
        if (event.stats.logins_count === 1) {
            const ManagementClient = require('auth0').ManagementClient;

            const management = new ManagementClient({
                domain: event.secrets.domain,
                clientId: event.secrets.clientId,
                clientSecret: event.secrets.clientSecret
            });

            const params =  { id : event.user.user_id};

            try {
            const userRoles = await management.getUserRoles(params);
            roles = userRoles.map((role) => role.name.toLowerCase());
            } catch (e) {
            console.log(e);
            // Handle error
            }
        }
        else {
            roles = event.authorization.roles.map(role => role.toLowerCase());
        }
    
        if (roles && roles.length > 0) {
            api.idToken.setCustomClaim("user_roles", roles);
            api.accessToken.setCustomClaim("user_roles", roles);

            const defaultRole = roles.reduce((highestRole, currentRole) => {
            if (currentRole === "admin") {
                return currentRole;
            }
            if (currentRole === "manager" && highestRole !== "admin") {
                return currentRole;
            }
            if (currentRole === "editor" && highestRole !== "admin" && highestRole !== "manager") {
                return currentRole;
            }
            if (currentRole === "viewer" && highestRole !== "admin" && highestRole !== "manager" && highestRole !== "editor") {
                return currentRole;
            }
            return highestRole;
            }, "");

            hasuraClaims["x-hasura-default-role"] = defaultRole;
            hasuraClaims["x-hasura-allowed-roles"] = roles;
        }
    
        api.accessToken.setCustomClaim("https://hasura.io/jwt/claims", hasuraClaims);
        }
    };
    ```