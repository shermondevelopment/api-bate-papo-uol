import { Router } from 'express'

/* router */
const router = Router()

/* controllers */
import { participantsAdd, participantsList  } from '../controllers/participants.js'
import { addMessage } from '../controllers/messages.js'

/* add participant */
router.post('/participants', participantsAdd)

/* list participants */
router.get('/participants', participantsList)

/* add messages */
router.post('/message', addMessage)

export default router