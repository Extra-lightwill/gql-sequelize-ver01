//all models from models folder are imported here

import Sequelize from 'sequelize';
import { sequelizeConnection } from 'graphql-sequelize';

import User from './models/UserModel';
import Task from './models/TaskModel';
import Project from './models/ProjectModel';
import ProjectUser from './models/ProjectUserModel'; 

//-----RELATIONSHIPS (ASSOCIATIONS)-----//

User.Tasks = User.hasMany(Task, {as: 'taskItems', foreignKey: 'user_id'});
User.Subordinates = User.hasMany(User, { as: 'subordinates', foreignKey: 'manager_id', constraints: false });
Task.User = Task.belongsTo(User, { foreignKey: 'user_id' });
Task.SubTask = Task.hasMany(Task, { as: 'subTasks', foreignKey: 'parent_id', constraints: false});
Project.Users = Project.belongsToMany(User, { through: ProjectUser, foreignKey: 'project_id', otherKey: 'user_id' });
User.Projects = User.belongsToMany(Project, { through: ProjectUser, foreignKey: 'user_id', otherKey: 'project_id' });

export {
    User,
    Task,
    Project,
    ProjectUser,
};


       