# My private Library

Web application for storing read books and provide a summary and rating. A MongoDB database with name `library_app` and a collection `books` has to
exist before starting the application (see `application.json`).

To start the Angular frontend:

```shell
cd ./Frontend
ng serve
```

To start the .NET backend:

```shell
dotnet run
```

## Frontend

Uses Angular v17. The styling is mostly based on Bootstrap v5, but also some TailwindCSS is used.

## Backend:

.NET. Currently used as a REST-API to perform CRUD operations on Books. 

## TODOs:

- serve static files from server instead of using the Angular development server