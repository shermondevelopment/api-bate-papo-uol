import participantsModel from "../schema/participants.js"

export const status = async (req, res) => {
  try {

    const { user } = req.headers

    const participants = await participantsModel.findOne({ name: user })
    if(!participants) {
      return res.sendStatus(404)
    }

    await participantsModel.updateOne({ id: participants._id, lastStatus: Date.now() })

    res.sendStatus(200)
    
  } catch (error) {
    res.sendStatus(500)
  }
}