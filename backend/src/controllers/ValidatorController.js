const User = require('../database/models/User')

module.exports = {
  async usernameAndEmailAvailability (req, res) {
    const { type, value } = req.params

    const valueFinded = await User.findOne({
      where: { [type]: value }, attributes: [type]
    })

    res.json(valueFinded)
  }
}
