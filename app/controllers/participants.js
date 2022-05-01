import { participantSchema } from '../validation/index.js'

/* model participants */ 
import participantsModel from '../schema/participants.js'

/* messages model */
import messageModel from '../schema/messages.js'

/* datjs */
import dayjs from 'dayjs'

export const participantsAdd = async (req, res) => {
  try {
    await participantSchema.validateAsync(req.body)
    const findParticipant = await participantsModel.findOne({ name: req.body.name})
    if(findParticipant) {
      return res.status(409).send('o usuário já existe')
    }

    await messageModel.create({ from: req.body.name, to: 'Todos', text: 'entra na sala...', type: 'status', time: dayjs(new Date()).format('HH:mm:ss') })

    await participantsModel.create(req.body)
    res.sendStatus(201)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

export const participantsList = async (req, res) => {
  try {
    const listAllParticipants = await participantsModel.find()
    res.status(200).send(listAllParticipants)
  } catch (error) {
    res.sendStatus(500)
  }
}