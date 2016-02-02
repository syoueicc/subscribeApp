export default () => {
	return process.env.NODE_ENV === 'production' ? {
				url: 'http://120.27.199.10',
				port: '3333',
				DBConect: [
					'developer',
					'gdas.developer',
					{
						host: '10.161.168.138',
						dialect: 'mysql',
						port: '3306'
					}
				]
			} : {
				url: 'http://localhost',
				port: '8989',
				DBConect: [
					'developer',
					'gdas.developer',
					{
						host: '127.0.0.1',
						dialect: 'mysql',
						port: '3305'
					}
				]
			}
};
