const Note = require('../database/models/Note')

module.exports = async function checksNoteAuthorship (req, res, next) {
  const { userid } = req.headers
  const { id } = req.params

  const noteFinded = await Note
    .findOne({ where: { id } })

  if (noteFinded) {
    if (noteFinded.userId === parseInt(userid)) {
      next()
    } else {
      res.status(403)
        .json({ message: 'This note does not belong to that user' })
    }
  } else {
    res.status(400)
      .json({ message: 'This note does not exist' })
  }
}
