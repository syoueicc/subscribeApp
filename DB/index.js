import configure from '../config';
import Sequelize from 'sequelize';

export const dmpServer = new Sequelize("dmp_server", ...configure().DBConect);