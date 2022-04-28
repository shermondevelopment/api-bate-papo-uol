import joi from 'joi'

export const participantSchema = joi.object({
  name: joi.string().required().error((errors) =>  new Error('o nome não pode ser vazio'))
})