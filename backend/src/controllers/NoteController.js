
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
  },
  async update (req, res) {
    const { title, body } = req.body
    const { noteid, userid } = req.headers

    const noteFinded = await Note
      .findOne({ where: { id: noteid } })

    if (noteFinded.userId === parseInt(userid)) {
      try {
        await Note.update({
          title,
          body
        }, { where: { id: noteid } })
        res.json({ message: 'Note updated successfully' })
      } catch (error) {
        res.status(500).json({ message: 'The note could not be updated' })
        throw new Error(error)
      }
    } else {
      res.status(403).json({ message: 'You cannot edit this note' })
    }
  },
  async delete (req, res) {
    const { userid } = req.headers
    const { noteid } = req.params

    const noteFinded = await Note
      .findOne({ where: { id: noteid } })

    if (noteFinded) {
      if (noteFinded.userId === parseInt(userid)) {
        try {
          await Note.destroy({ where: { id: noteid } })
          res.json({ message: 'Note successfully deleted' })
        } catch (error) {
          res.status(500).json({ message: 'The note cannot be deleted' })
          throw new Error(error)
        }
      } else {
        res.status(403).json({ message: 'You cannot edit this note' })
      }
    } else {
      res.status(400).json({ message: 'Invalid note data' })
    }
  }
}
