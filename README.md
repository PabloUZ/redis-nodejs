# Redis in Node.js

This app exposes an endpoint which simulates a high-cost operation (`/huge`).

It uses Redis to cache the result of this operation. The first time you call the endpoint, it will take a while to respond, but subsequent calls will be much faster.

## Prerequisites
- Docker

## Running the app
1. Clone the repository:
```bash
git clone
cd redis-nodejs
```

2. Run Docker
```bash
docker compose up -d
```

> [!NOTE]
> Default port for the app is 3000<br>
> If you want to change it, go to the `docker-compose.yml` and search for the service `app`.
> Locate the section `ports` and change the port before the colon (`- <change>:3000`)


## Testing the app

This project contains a directory called `.postman`. Inside, you'll find all the collections you need for testing.

Just go to postman, open a workspace and import all files.