export default () => ({
	port: Number.parseInt(process.env.PORT || '3001', 10),
	database_url: process.env.DATABASE_URL,
});
