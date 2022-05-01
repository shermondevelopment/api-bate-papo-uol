import mongoose from 'mongoose'

const participantsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastStatus: { type: Date }
})

const participantsModel =  mongoose.model('participants', participantsSchema)

export default participantsModel