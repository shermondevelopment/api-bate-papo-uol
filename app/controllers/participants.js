import { participantSchema } from '../validation/index.js'

export const participantsAdd = async (req, res) => {
  try {
    await participantSchema.validateAsync(req.body)
    res.status(201).json(name)
  } catch (error) {
    res.status(422).json(error.message)
  }
}