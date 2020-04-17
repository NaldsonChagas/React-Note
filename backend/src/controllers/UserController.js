const User = require('../database/models/User')

const passwordUtil = require('../utils/passwordUtil')

module.exports = {
  async save (req, res) {
    const { name, surname, username, email, password } = req.body

    try {
      await User.create({
        name,
        surname,
        username,
        email,
        password: passwordUtil.setPassword(password)
      })
      res.json({ message: 'Usuário cadastrado com sucesso' })
    } catch (err) {
      res.status(500).json({ message: 'Ocorreu um erro ao realizar o cadastro' })
      throw new Error("Can't save user")
    }
  },
  async update (req, res) {
    const { userid } = req.headers

    const {
      name,
      surname,
      username,
      email
    } = req.body

    try {
      await User.update({
        name,
        surname,
        username,
        email
      }, { where: { id: userid } })
      res.json({
        id: userid,
        message: 'Informações atualizadas'
      })
    } catch (e) {
      res.status(500)
        .json({ message: 'Não foi possível atualizar as informações' })
      throw new Error('The user could not be updated')
    }
  },
  async delete (req, res) {
    const { userid } = req.headers

    try {
      await User.destroy({ where: { id: userid } })
      res.json({ message: 'Usuário excluído' })
    } catch (e) {
      res.status(500)
        .json({ message: 'Não foi possível concluir a operação' })
      throw new Error('The user could not be deleted')
    }
  }
}
