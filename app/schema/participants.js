import mongoose, { Schema } from 'mongoose'

const participantsSchema = new Schema({
  name: { type: String, required: true },
  lastStatus: { type: Date, default: Date.now() }
})

export default  mongoose.model('participants', participantsSchema)