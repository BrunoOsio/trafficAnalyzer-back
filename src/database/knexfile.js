require("dotenv").config()

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : process.env.MYSQL_HOST,
      user : process.env.MYSQL_USER,
      password : '',
      database : process.env.MYSQL_DB
    }  
  },
}