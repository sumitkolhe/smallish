import mongoose from 'mongoose'
import { config } from '@config/config'

export const connectDatabase = async () => {
	await mongoose
		.connect(config.MONGO_URL, {
			dbName: 'user_data',
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})
		.then(() => {
			console.log('Connected To Database')
		})
		.catch((err) => {
			console.log(err.message)
		})
}
