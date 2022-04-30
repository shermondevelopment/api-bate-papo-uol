import { Router } from 'express'

/* router */
const router = Router()

/* controllers */
import { participantsAdd, participantsList  } from '../controllers/participants.js'

/* add participant */
router.post('/participants', participantsAdd)

/* list participants */
router.get('/participants', participantsList)

export default router