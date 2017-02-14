import Sequelize from 'sequelize';

const Conn = new Sequelize(
  'relay_db_test', //name of db
  'root', //username
  'relay_db', //password
  {
    dialect: 'mysql', //dialect
    host: 'localhost' //host
  }
);


Conn.sync({ force: true })

export default Conn; 
