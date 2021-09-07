const { Category, Activity } = require('../models')

const create = (data) => Category.create(data)

const getByName = (name) => Category.findOne({ where: { name }})

const getById = (id) => Category.findByPk(id, {
  include: {
    model: Activity,
    as: 'activities'
  }
})

const  getAll = async(query) => {}

const edit = async(category) => {}

const remove = async(category) => {}

module.exports = {
  create,
  getByName,
  getById,
  getAll,
  edit,
  remove
}