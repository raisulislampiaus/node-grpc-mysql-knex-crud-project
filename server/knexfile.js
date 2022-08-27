const path = require('path');

module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        user: 'your user name',
        password: 'your password',
        port: '3306',
        database: 'grpc',
       
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: path.join(__dirname, 'db', 'migrations'),
      },
      seeds: {
        directory: path.join(__dirname, 'db', 'seeds'),
      },
    },
  };