import Sequelize from 'sequelize';
import Conn from '../connection';

const Task = Conn.define('Task', {
	id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
	title: {
		type: Sequelize.TEXT, 
	},
});

export default Task;