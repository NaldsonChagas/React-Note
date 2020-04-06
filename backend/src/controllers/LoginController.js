const jwt = require('jsonwebtoken')

const User = require('../database/models/User')
const passwordUtil = require('../utils/passwordUtil')

module.exports = {
  async login (req, res) {
    const { username, password } = req.body

    const user = await User
      .findOne({ where: { username } })

    if (user) {
      if (passwordUtil
        .comparePassword(password, user.password)) {
        const token = jwt.sign({ user }, process.env.LOGIN_KEY, {
          expiresIn: '12h'
        })

        res.json({
          message: 'Authentication done',
          token
        })
      }
    }
    res.status(401).json({ message: 'Invalid credentials' })
  }
}
