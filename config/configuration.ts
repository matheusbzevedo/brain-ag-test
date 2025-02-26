export default () => ({
	port: Number.parseInt(process.env.PORT || '3001', 10),
});
