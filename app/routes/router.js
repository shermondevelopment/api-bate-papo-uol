import { Router } from 'express'

/* router */
const router = Router()

/* controllers */
import { participantsAdd  } from '../controllers/participants.js'

router.post('/participants', participantsAdd)

export default router