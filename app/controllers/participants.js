import { participantSchema } from '../validation/index.js'

/* model participants */ 
import participantsModel from '../schema/participants.js'

export const participantsAdd = async (req, res) => {
  try {
    await participantSchema.validateAsync(req.body)

    const findParticipant = await participantsModel.findOne({ where: req.body.name})

    if(findParticipant) {
      return res.status(409).send('o usuário já existe')
    }

    await participantsModel.create(req.body)
    res.status(201).json(req.body.name)
  } catch (error) {
    res.status(422).json(error.message)
  }
}