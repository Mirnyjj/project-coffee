const Category = require('../models/Category')

// add
async function addCategory(category) {
    const newCategory = await Category.create(category);

    return newCategory
}

// edit
async function editCategory(id, category) {
    const newCategory = await Category.findByIdAndUpdate(id, category, { returnDocument: 'after' })

    return newCategory;
}

// delete
function deleteCategory(id) {
    return Category.deleteOne({ _id: id })
}

// get list with search and pagination
async function getCategories(limit, page) {
    const [categories, count] = await Promise.all([
        Category
        .find()
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 }),
        Category.countDocuments()])
    return {
        categories,
        lastPage: Math.ceil(count / limit)
    }
}

// get item
function getCategory(id) {
    return Category.findById(id)
}


module.exports = {
    addCategory: addCategory,
    editCategory: editCategory,
    deleteCategory: deleteCategory,
    getCategories: getCategories,
    getCategory: getCategory
}