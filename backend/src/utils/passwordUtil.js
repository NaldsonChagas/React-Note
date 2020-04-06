const bcrypt = require('bcrypt')

module.exports = {
  setPassword (value) {
    return bcrypt.hashSync(value, 10)
  },
  comparePassword (p1, p2) {
    return bcrypt.compareSync(p1, p2)
  }
}
