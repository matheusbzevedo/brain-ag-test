/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'brain-ag-test',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			protect: ['production'].includes(input?.stage),
			home: 'aws',
		};
	},
	async run() {
		const vpc = new sst.aws.Vpc('vpc');
		const cluster = new sst.aws.Cluster('cluster', { vpc });

		new sst.aws.Service('service', {
			cluster,
			loadBalancer: {
				rules: [{ listen: '80/http', forward: '3001/http' }],
			},
			architecture: 'arm64',
			environment: {
				DATABASE_URL:
					'postgres://postgres:protheus1@database-2.cha44m8g8f4f.sa-east-1.rds.amazonaws.com:5432/brain-ag-test?schema=public',
			},
			dev: {
				command: 'npm run start:dev',
			},
		});
	},
});
