/* dayjs */
import dayjs from 'dayjs'

/* messages model */
import messageModel from '../schema/messages.js'
import participantsModel from '../schema/participants.js'

/* schema validation */
import { validInputMessages } from '../validation/index.js'


export const addMessage = async (req, res) => {
  try {
    const { to, text, type } = req.body
    const { user:from } = req.headers

    await validInputMessages(['message', 'private_message']).validateAsync({ to, from, type, text })

    const findParticipant = await participantsModel.findOne({ name: from })

    if(!findParticipant) {
      throw new Error('participant is not on the list')
    }

    await messageModel.create({to, from, text: text.replace(/<.*?>/g, ' ').trim(), type, time: dayjs(new Date()).format('HH:mm:ss')})
    res.sendStatus(201)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

export const listMessage = async (req, res) => {
  try {

    const { user } = req.headers

    const limit = parseInt(req.query.limit)

    const participants = await messageModel.find({ $or: [{ to: 'Todos' }, { to: user }, {from: user}]}).limit(limit)
    return res.status(200).json(participants)
  } catch (error) {
    res.status(422).json(error.message)
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const { user } = req.headers
    const { id } = req.params

    const existMessage = await messageModel.findOne({ _id: id })

    if(!existMessage) {
      return res.sendStatus(404)
    }
    
    if(existMessage.from !== user) {
      return res.sendStatus(401)
    }

    await messageModel.deleteOne({ _id: existMessage._id })
    res.sendStatus(200)

  } catch(error) {
    res.status(500).send('internal server error')
  }
}

export const updateMessage = async (req, res) => {
  try {

    const { to, text, type } = req.body
    const { user: from} = req.headers
    const { id } = req.params

    await validInputMessages(['message', 'private_message']).validateAsync({ to, text, type, from })

    const messageExists = await messageModel.findOne({ _id: id  })

    if(!messageExists) {
      return res.sendStatus(404)
    }

    if(messageExists.from !== from) {
      return res.sendStatus(401)
    }

    const updated = await messageModel.updateOne({ _id: messageExists._id }, { ...req.body })

  } catch (error) {
    res.sendStatus(422)
  }
}