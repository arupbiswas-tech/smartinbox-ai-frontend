# SmartInbox AI frontend

This is a React application built with Vite. Docker Compose starts Vite in
development mode with the source directory mounted, so edits are picked up
without rebuilding the image.

## Run independently with Docker Compose

From this directory, run:

```sh
docker compose up --build
```

Open [http://localhost:5173](http://localhost:5173). Save changes to files under
`src/` and Vite will update the page; refresh if needed. Stop the service with:

```sh
docker compose down
```

The Nginx production image remains available by building the default Dockerfile
target:

```sh
docker build -t smartinbox-ai-frontend .
docker run --rm -p 8080:80 smartinbox-ai-frontend
```

Open [http://localhost:8080](http://localhost:8080).