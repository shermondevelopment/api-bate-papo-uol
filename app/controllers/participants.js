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
    /* sanatize name */
    const username = req.body.name.replace(/<.*?>/g, ' ').trim()

    const findParticipant = await participantsModel.findOne({ name: username })
    if(findParticipant) {
      return res.status(409).send('o usuário já existe')
    }

    await messageModel.create({ from: username, to: 'Todos', text: 'entra na sala...', type: 'status', time: dayjs(new Date()).format('HH:mm:ss') })

    await participantsModel.create({...req.body, lastStatus: Date.now()})
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

export const removeParticipants = async () => {
  try {
    const dateNext = Date.now() - 10000;
    const findParticipnatsInactive = await participantsModel.find({ lastStatus: { $lt: new Date(dateNext)  } })
    findParticipnatsInactive.forEach( async (removedParticipant) => {
      await participantsModel.deleteOne({ _id: removedParticipant._id })
      await messageModel.create({ from: removedParticipant.name, to: 'Todos', text: 'sai da sala...', type: 'status', time: dayjs(new Date()).format('HH:mm:ss')  })
    } )
  } catch(error) {
    console.log(error)
  }
}
