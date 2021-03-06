const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const User = require('../database/models/User')
const passwordUtil = require('../utils/passwordUtil')

module.exports = {
  async login (req, res) {
    const { user, password } = req.body

    const userFinded = await User
      .findOne({
        where:
          {
            [Op.or]: [
              { username: user },
              { email: user }]
          }
      })

    if (userFinded && passwordUtil
      .comparePassword(password, userFinded.password)) {
      const token = jwt.sign({ userFinded }, process.env.LOGIN_KEY, {
        expiresIn: '3h'
      })

      res.json({
        message: 'Authentication done',
        userId: userFinded.id,
        token
      })
    } else {
      res.status(401).json({ message: 'Nome de usuário ou senha incorretos' })
    }
  }
}
