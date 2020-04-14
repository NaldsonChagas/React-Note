
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
    } catch (error) {
      res.status(500).json({ message: 'The note could not be saved' })
      throw new Error(error)
    }
  },
  async update (req, res) {
    const { title, body } = req.body
    const { id } = req.params

    try {
      await Note.update({
        title,
        body
      }, { where: { id } })
      res.json({ message: 'Note updated successfully' })
    } catch (error) {
      res.status(500).json({ message: 'The note could not be updated' })
      throw new Error(error)
    }
  },
  async delete (req, res) {
    const { id } = req.params

    try {
      await Note.destroy({ where: { id } })
      res.json({ message: 'Note successfully deleted' })
    } catch (error) {
      res.status(500).json({ message: 'The note cannot be deleted' })
      throw new Error(error)
    }
  }
}
