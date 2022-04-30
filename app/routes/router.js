import { Router } from 'express'

/* router */
const router = Router()

/* controllers */
import { participantsAdd, participantsList  } from '../controllers/participants.js'
import { addMessage, listMessage } from '../controllers/messages.js'

/* add participant */
router.post('/participants', participantsAdd)

/* list participants */
router.get('/participants', participantsList)

/* add messages */
router.post('/message', addMessage)

/* list message */
router.get('/messages', listMessage)

export default router