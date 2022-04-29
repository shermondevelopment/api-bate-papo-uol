import Joi from 'joi'

export const participantSchema = Joi.object({
  name: Joi.string().required().error((errors) =>  new Error('o nome não pode ser vazio'))
})