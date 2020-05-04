const User = require('../database/models/User')

const passwordUtil = require('../utils/passwordUtil')

module.exports = async function (req, res, next) {
  const { password } = req.body
  const { userid } = req.headers

  const userFinded = await User
    .findOne({ where: { id: userid } })

  if (password) {
    if (passwordUtil
      .comparePassword(password, userFinded.password)) {
      next()
    } else {
      res.status(401)
        .json({ message: 'Senha incorreta' })
    }
  } else {
    res.status(400)
      .json({ message: 'Você precisa enviar sua senha' })
  }
}
