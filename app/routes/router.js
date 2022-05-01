import { Router } from 'express'

/* router */
const router = Router()

/* controllers */
import { participantsAdd, participantsList  } from '../controllers/participants.js'
import { addMessage, listMessage } from '../controllers/messages.js'
import { status } from '../controllers/status.js'
/* add participant */
router.post('/participants', participantsAdd)

/* list participants */
router.get('/participants', participantsList)

/* add messages */
router.post('/message', addMessage)

/* list message */
router.get('/messages', listMessage)

/* status message */
router.post('/status', status)

export default router