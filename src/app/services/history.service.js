const { History } = require('../models')

const create = (data) => History.create(data)

module.exports = {
  create
}