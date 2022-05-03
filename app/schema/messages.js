import mongoose from 'mongoose'

const messageShema = new mongoose.Schema({
  from: { type: String, required: true  },
  to: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, enum: ['message', 'private_message', 'status'], required: true },
  time: { type: String, required: true }
}, { timestamps: true })

const messageModel =  mongoose.model('messages', messageShema)

export default messageModel