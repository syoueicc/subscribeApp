import { Ind,SubList } from '../Model';
import { dmpServer } from '../DB';
import isError from 'lodash/isError'

export default function APIS(routes) {
	routes
	.get('/apis/ind', function *(next) {
		const response =  yield Ind.findAll({
			attributes: [[dmpServer.fn('DISTINCT', dmpServer.col('indname')), 'indname']]
		});
		this.body = response;
	})
	.get('/apis/type/:type', function *(next) {
		const response =  yield Ind.findAll({
			attributes: [[dmpServer.fn('DISTINCT', dmpServer.col('typename')), 'typename']],
			where: {
				indname: this.params.type
			}
		});
		this.body = response;
	})
	.get('/apis/tag/:tag', function *(next) {
		const response =  yield Ind.findAll({
			attributes: [[dmpServer.fn('DISTINCT', dmpServer.col('tagname')), 'tagname']],
			where: {
				typename: this.params.tag
			}
		});
		this.body = response;
	})
	.get('/apis/list/:id', function *(next) {
		const response =  yield SubList.findAll({
			attributes: ['id', 'userid', 'indname', 'typename', 'tagname', 'process'],
			where: {
				userid: this.params.id
			}
		});
		this.body = response;
	})
	.get('/apis/create', function *(next) {
		const query = this.request.query;
		const result = yield SubList.create({
			userid: query.id, 
			indname: query.indname,
			typename: query.typename,
			tagname: query.tagname,
			process: 0
		}).catch(err => new Error('add failed'));

		if(isError(result)) {
			this.body = {success: false};
		}else{
			this.body = {success: true, payload: result};
		}
	})
}