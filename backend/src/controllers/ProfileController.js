const User = require('../database/models/User')

module.exports = {
  async profile (req, res) {
    const userId = req.headers.userid

    if (userId) {
      const user = await User
        .findOne({
          where: { id: userId },
          attributes: { exclude: 'password' }
        })
      res.json({ user })
    } else {
      res.status(400).json({ message: 'User id not sent' })
    }
  }
}
