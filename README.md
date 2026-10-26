# Spring React E-Commerce

Spring React E-Commerce is a full-stack online shopping application with a
Spring Boot REST API and a React storefront. The project combines a Java 21
backend with a Vite-powered React frontend to provide a clean shopping
experience for browsing, searching, filtering, favoriting, and adding products
to a bag.

## Project preview

![Luma storefront preview](./Screenshot_26-10-2026_10292_localhost.jpeg)

## Features

- Responsive storefront UI for desktop and mobile layouts
- Product listing, search, and category filtering
- Favorite products and shopping bag count interactions
- Spring Boot REST endpoints for product CRUD operations
- PostgreSQL persistence through Spring Data JPA
- Fallback product data in the frontend when the backend is unavailable

## Tech stack

- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Java 21, Spring Boot, Spring Web MVC, Spring Data JPA
- **Database:** PostgreSQL

## Project structure

```text
.
├── ecommerce/    # Spring Boot backend
├── frontend/     # React + Vite frontend
└── Screenshot_26-10-2026_10292_localhost.jpeg
```

## Getting started

### Backend

1. Create a PostgreSQL database named `ecommerce`.
2. Set the `DB_PASSWORD` environment variable and configure any other local
   database settings in `ecommerce/src/main/resources/application.properties`.
3. Start the API:

   ```bash
   cd ecommerce
   ./mvnw spring-boot:run
   ```

   On Windows, use `mvnw.cmd spring-boot:run`.

The backend runs at `http://localhost:8080` and exposes product endpoints
under `/api/products`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will print its local URL in the terminal. The
frontend expects the backend at `http://localhost:8080/api`.

## Building and testing

Run the frontend checks with:

```bash
cd frontend
npm run lint
npm run build
```

Run the backend tests with:

```bash
cd ecommerce
./mvnw test
```
