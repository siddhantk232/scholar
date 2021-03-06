# Scholar

A role-based restAPI for School Management Software.

---

A roughly structured plan and todo list is available [here](https://github.com/siddhantk232/scholar/blob/main/plan.md)

### Requirements

  - node v17.4.0
  - postgresql 14
  - docker (optional)

### Setup

#### Database

  - Start a postgres docker container or setup a postgres database.

    ```sh
    docker run -p 5432:5432 -e POSTGRES_PASSWORD=passwd -e \
    POSTGRES_DB=scholar_dev -e POSTGRES_USER=scholar --name=scholar_dev -d \
    postgres:14
    ```

  - `cp .env.example .env` and edit the `DATABASE_URL`.
    use `"postgresql://scholar:passwd@localhost:5432/scholar_dev?schema=public"` for the postgres container.

#### Code

  - Use below listed commands to setup and run the code.

    ```sh
    git clone git@github.com:siddhantk232/scholar.git
    cd scholar
    npm i
    npm run build
    npx prisma migrate dev
    npm start
    ```

    More npm scripts are available for dev use (see [`package.json`](https://github.com/siddhantk232/scholar/blob/main/package.json))

  - The documentation can be viewed at `http://localhost:3000/api/v1/doc` after you have run the development server.

