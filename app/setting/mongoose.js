import mongoose from 'mongoose'

export default mongoose.connect(process.env.MONGOOSE_URI)