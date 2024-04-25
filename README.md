# GYZER TECH

## Description

Employee Evaluation System

## Overview

This project is an employee evaluation system to facilitate the monthly performance evaluations of staff members by their managers and vice versa. The system will automate reminder emails and provide an online evaluation form to ensure timely feedback within the organization.

## Features

- **Work Quality**
- **Task Completion**
- **Above And Beyond**
- **Communication**
- **User Authentication**

## API Documentation

For detailed API documentation, you can refer to the [Postman Documentation.](https://documenter.getpostman.com/view/27688954/2sA3Bt193v)

## Live URL

Check out the live URL [here.](https://mainstack-production.up.railway.app/api/v1)

## Built With

Express.js - Web Framework  
Typescript - Programming language  
PostgreSQL/Sequelize - Database /ORM 

## Prerequisites

Node.js version 16.x.x or higher

## Installation

1. Clone the repository and navigate to the project directory

2. Run the following command to clone:

```bash
  git clone https://github.com/elughsmanuel/gyzer-tech.git

```

3. Create a `.env` file in the root directory and set the environment variables, see `.env_example` file for an example.

## Database Configuration

This application uses PostgreSQL as its database. To configure the database, add the following environment variables to a .env file in the root directory of the project:

```bash
NODE_ENV=node_environment
HOST=server_host
PORT=server_port
DATABASE_URL="postgres://postgres:12345@localhost:5432/gyzertech"
```

Replace: node_environment, server_host, server_port and database_url with your values.

## Database Migrations and Seeding

Before running the application, ensure that you've performed database migrations and seeding to set up the database schema and populate it with initial data.

Add the necessary environment variables for admin details in the .env file to seed the data:

```bash
ADMIN_FIRST_NAME=admin_first_name
ADMIN_LAST_NAME=admin_last_name
ADMIN_EMAIL=admin_email
ADMIN_USERNAME=admin_username
ADMIN_PASSWORD=admin_password
```

To deploy migrations and seed the database, use the following npm scripts:

Migration:

```bash
npm run db:migrate:dev
```

Seed:

```bash
npm run db:seed:all:dev
```

## Install app dependencies

```bash
npm install
```

It will install all modules listed as dependencies in package.json.

## Running the app

```bash
npm run dev
```

## Start up server

When you see...

[1] [DATABASE] - Database connection has been established successfully.  
[1] - - - - - - - - - -  
[1] 🌟 🛠️  [SERVER] - Server is listening on http://${host}:${port}  

...server is up and running.
