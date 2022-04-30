/* dayjs */
import dayjs from 'dayjs'

/* messages model */
import messageModel from '../schema/messages.js'
import participantsModel from '../schema/participants.js'

/* schema validation */
import { messagesSchema } from '../validation/index.js'


export const addMessage = async (req, res) => {
  try {
    const { to, text, type } = req.body
    const { user:from } = req.headers

    await messagesSchema.validateAsync({ to, from, type, text })

    const findParticipant = await participantsModel.findOne({ name: from })

    if(type !== 'message' && type !== 'private_message') {
      throw new Error('type can only be message our private_message')
    }

    if(!findParticipant) {
      throw new Error('participant is not on the list')
    }

    await messageModel.create({to, from, text, type, time: dayjs(new Date()).format('HH:mm:ss')})
    res.sendStatus(201)
  } catch (error) {
    res.status(422).json(error.message)
  }
}