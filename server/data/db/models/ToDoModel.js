import Sequelize from 'sequelize';
import Conn from '../connection';

const ToDo = Conn.define('todo', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    text: { 
        type: Sequelize.TEXT, 
        allowNull: false 
    },
    complete: { 
        type: Sequelize.BOOLEAN, 
        allowNull: false 
    },
});

export default ToDo;