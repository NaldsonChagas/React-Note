
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
      const note = await Note.create({
        title,
        body,
        userId: userid
      })
      res.json({ message: 'Nota salva', note })
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro ao salvar a nota' })
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
      res.json({ message: 'Nota atualizada com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'A nota não pode ser atualizada no momento' })
      throw new Error(error)
    }
  },
  async delete (req, res) {
    const { id } = req.params

    try {
      await Note.destroy({ where: { id } })
      res.json({ message: 'Nota excluída' })
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro ao deletar a nota' })
      throw new Error(error)
    }
  }
}
