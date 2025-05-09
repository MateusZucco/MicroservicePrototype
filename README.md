## Getting Started

### Prerequisites

To run this API in the development mode, you'll need to have a environment with NodeJS installed and you'll need to have a mysql database running on your machine at the port (3306).

### Environment variables example
Create a .env file to save yours environment variables, like this:

```
JWT_SECRET="my_hash",
DB_NAME="my_db_name",
DB_USER="my_db_username",
DB_PASSWORD="my_db_password",
DB_HOST="localhost",
DB_PORT="3306",
```

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/MateusZucco/AcademyApi.git
$ cd academyApi
```

**Installing dependencies**

```
$ npm install
$ npm install:all
```

### Running the Development environment

With all dependencies installed, the Database running and the environment properly configured, you can now run the server:

```
$ npm run start:all
```
