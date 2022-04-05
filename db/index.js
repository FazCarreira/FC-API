const mongoose = require('mongoose');
const initialData = require('./initialData');

const connectDB = async () => {
	const db = process.env.URI || 'mongodb://localhost:27017/faz-carreira'
	const options = {
		// useNewUrlParser: true,
		// useCreateIndex: true,
		// useUnifiedTopology: true,
		// useFindAndModify: false
	};

	try {
		await mongoose.connect(db, options);
		initialData();
		console.log('MongoDB CONECTADO - FAZCARREIRA');
	} catch (err) {
		console.error(err.message);
		// Sai do projeto com erro
		process.exit(1);
	}
};

module.exports = connectDB;