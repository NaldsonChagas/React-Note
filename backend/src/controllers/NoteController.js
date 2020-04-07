
const Note = require('../database/models/Note')

module.exports = {
  async index (req, res) {
    const { userid } = req.headers

    const notes = await Note
      .findAll({ where: { userId: userid } })

    res.json({ notes })
  },
  async save (req, res) {
    const { userid } = req.headers
    const { title, body } = req.body

    try {
      await Note.create({
        title,
        body,
        userId: userid
      })
      res.json({ message: 'Note created successfully' })
    } catch (e) {
      res.status(500).json({ message: 'The note could not be saved' })
      throw new Error(e)
    }
  }
}
