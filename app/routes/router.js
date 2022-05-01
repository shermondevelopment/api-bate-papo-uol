import { Router } from 'express'

/* router */
const router = Router()

/* controllers */
import { participantsAdd, participantsList  } from '../controllers/participants.js'
import { addMessage, listMessage, deleteMessage, updateMessage } from '../controllers/messages.js'
import { status } from '../controllers/status.js'
/* add participant */
router.post('/participants', participantsAdd)

/* list participants */
router.get('/participants', participantsList)

/* add messages */
router.post('/messages', addMessage)

/* list message */
router.get('/messages', listMessage)

/* status message */
router.post('/status', status)

/* deleted message */
router.delete('/messages/:id', deleteMessage)

/* updated message */
router.put('/messages/:id', updateMessage)

export default router