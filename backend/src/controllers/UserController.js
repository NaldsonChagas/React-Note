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
  },
  async update (req, res) {
    const { password } = req.body
    const { userid } = req.headers

    const userFinded = await User
      .findOne({ where: { id: userid } })

    if (userFinded) {
      if (passwordUtil
        .comparePassword(password, userFinded.password)) {
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
            message: 'User updated successfully'
          })
        } catch (e) {
          res.status(500)
            .json({ message: 'The user could not be updated' })
          throw new Error('The user could not be updated')
        }
      } else {
        res.status(401).json({ message: 'Wrong password' })
      }
    } else {
      res.status(400).json({ message: 'Nonexistent user' })
    }
  },
  async delete (req, res) {
    const { userid } = req.headers
    const { password } = req.body

    const userFinded = await User
      .findOne({ where: { id: userid } })

    if (userFinded) {
      if (passwordUtil
        .comparePassword(password, userFinded.password)) {
        try {
          await User.destroy({ where: { id: userid } })
          res.json({ message: 'User successfully deleted' })
        } catch (e) {
          res.status(500)
            .json({ message: 'The user could not be deleted' })
          throw new Error('The user could not be deleted')
        }
      } else {
        res.status(401).json({ message: 'Wrong password' })
      }
    } else {
      res.status(400).json({ message: 'Nonexistent user' })
    }
  }
}
