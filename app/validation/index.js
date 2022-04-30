import Joi from 'joi'

export const participantSchema = Joi.object({
  name: Joi.string().trim().required().error((errors) =>  new Error('o nome não pode ser vazio'))
})

export const messagesSchema = Joi.object({
  to: Joi.string().trim().required().error((errors) =>  new Error('please inform the destination')),
  from: Joi.string().trim().required().error((errors) => new Error('sender cannot is empty')),
  text: Joi.string().trim().required().error((errors) =>  new Error('message cannot is empty')),
  type: Joi.string().trim().required().valid('message', 'private_message', 'status').error((errors) =>  new Error(errors))
})

export const validInputMessages = () => {
  
}