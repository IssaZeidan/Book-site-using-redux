const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "3696",
  host: "localhost",
  port: 5433,
  database: "stories",
});

module.exports = pool;
