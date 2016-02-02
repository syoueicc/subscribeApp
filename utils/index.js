import fs from 'fs';
import path from 'path';

export function RenderReact(views='index', reactString, finalState) {
	try{
		const html = fs.readFileSync( path.join( __dirname, '../views/' + views + '.html' ), 'utf8' );
		return eval("String.raw`" + html + "`");
	}catch(error) {
		throw new Error('not found templete...');
	}
	
}