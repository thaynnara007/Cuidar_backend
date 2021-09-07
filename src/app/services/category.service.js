const { Category, Activity } = require('../models')

const create = (data) => Category.create(data)

const getByName = (name) => Category.findOne({ where: { name }})

const getById = (id) => Category.findByPk(id, {
  include: {
    model: Activity,
    as: 'activities'
  }
})

const getJustCategory = (id) => Category.findByPk(id)

const  getAll = async(query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let categories = null;

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
    };
    categories = await Category.findAndCountAll(options);

    categories.pages = Math.ceil(categories.count / pageSize);
  } else {
    categories = await Category.findAll();
  }
  
  return categories;
}

const edit = async (id, data) => {
  await Category.update(data, {
    where: {
      id,
      }  
    })
  
  return getById(id)
}

const remove = async(category) => {}

module.exports = {
  create,
  getByName,
  getById,
  getJustCategory,
  getAll,
  edit,
  remove
}