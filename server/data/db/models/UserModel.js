import Sequelize from 'sequelize';
import Conn from '../connection';

const User = Conn.define('User', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.TEXT, 
    },
    website: {
        type: Sequelize.TEXT, 
    },
    test01: {
        type: Sequelize.TEXT, 
    },
    test02: {
        type: Sequelize.TEXT, 
    },

});

export default User;


