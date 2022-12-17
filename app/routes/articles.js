const express = require('express')
const router = express.Router()
const { authUser, authPerms } = require('../middleware/auth')
const { getArticles,
    createArticle,
    getSingleArticle,
    updateArticle,
    deleteArticle } = require('../controllers/articles')
//Article routes (public and protected)
router.route('/')
    .get(getArticles)
    .post([authUser, authPerms('admin')],createArticle)
router.route('/:id')
    .get(getSingleArticle)
    .put([authUser, authPerms('admin')],updateArticle)
    .delete([authUser, authPerms('admin')], deleteArticle)
module.exports = router