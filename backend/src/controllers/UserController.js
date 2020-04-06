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
      res.json({ message: 'User saved successfully' })
    } catch (err) {
      res.status(500).json({ message: 'The user could not be saved' })
      throw new Error("Can't save user")
    }
  }
}
