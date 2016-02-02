import { dmpServer } from '../DB';
import Sequelize from 'sequelize';

export const Ind = dmpServer.define('dim_media_tagdic_org_ind', {
		indname: {
			type: Sequelize.STRING
		},
		typename: {
			type: Sequelize.STRING
		},
		tagname: {
			type: Sequelize.STRING
		}
	},{
		freezeTableName: true
	}
	
);

export const User = dmpServer.define('sub_users', {

		name: {
			type: Sequelize.STRING
		},
		psd: {
			type: Sequelize.STRING
		},
		token: {
			type: Sequelize.STRING
		}
	},{
		freezeTableName: true
	}
	
);

export const SubList = dmpServer.define('dim_user_subscribe_list', {
		userid: {type: Sequelize.STRING},
		indname: {type: Sequelize.STRING},
		typename: {type: Sequelize.STRING},
		tagname: {type: Sequelize.STRING},
		process: {type: Sequelize.STRING},
		createdAt: {type: Sequelize.DATE},
		updatedAt: {type: Sequelize.DATE}

	},{
		freezeTableName: true
	}
);

//选竞品
//select * from dw_tags_relation where id='10021' order by count_userid desc;