const Article = require('../models/Article')
const topics = require('../utils/tags')
const asyncWrapper = require('../middleware/asyncErrors')
const { NotFoundError, BadRequestError, APIError, UnauthenticatedError } = require('../errors/custom')
const { StatusCodes } = require('http-status-codes')
//const mongoose = require('mongoose')

//Get all articles with queries
const getArticles = asyncWrapper(async (req, res) => {
    const { title, author, tags, start, end, sort, content } = req.query
    const queryObject = {}
    const orConditions = []
    if (title) {
        orConditions.push({ title: { $regex: title, $options: 'i' } })
    }
    if (content) {
        orConditions.push({ content: { $regex: content, $options: 'i' } })
    }
    if (author) {
        orConditions.push({ author: { $regex: author, $options: 'i' } })
    }
    if (orConditions.length > 0) {
        queryObject.$or = orConditions
    }
    if (tags) {
        const tagArray = Array.isArray(tags) ? tags : tags.split(',')
        queryObject.tags = {
        $elemMatch: {
            $in: tagArray.map(tag => new RegExp(`^${tag}$`, 'i'))
        }
    }
    }
    if (start, end) { //if both are provided
        queryObject["createdAt"] = {
            ['$gte']: new Date(start),
            ['$lte']: new Date(end)
        }
    } else if (start) { //if start is provided
        queryObject["createdAt"] = { ['$gte']: new Date(start) }
    } else if (end) { //if end is provided
        queryObject["createdAt"] = { ['$lte']: new Date(end) }
    }
    let result = Article.find(queryObject)
    if (sort === "oldest") {
        const sortList = sort.split(',').join(' ')
        result = (await result.sort(sortList))
    } else {
        result = (await result.sort('createdAt')).reverse()
    }
    const articles = await result
    res.status(StatusCodes.OK).json({ articles })
})
//Get feed based on user interests
const getFeed = asyncWrapper(async (req, res) => {
    console.log(req.user.email)
    const { title, author, start, end, sort, content } = req.query
    const queryObject = {}
    if (title) {
        queryObject.title = { $regex: title, $options: 'i' }
    }
    if (content) {
        queryObject.content = { $regex: content, $options: 'i' }
    }
    if (author) {
        queryObject.author = { $regex: author, $options: 'i' }
    }
    if (req.user.interests) {
        queryObject.tags = { $in: req.user.interests }
    }
    if (start, end) { //if both are provided
        queryObject["createdAt"] = {
            ['$gte']: new Date(start),
            ['$lte']: new Date(end)
        }
    } else if (start) { //if start is provided
        queryObject["createdAt"] = { ['$gte']: new Date(start) }
    } else if (end) { //if end is provided
        queryObject["createdAt"] = { ['$lte']: new Date(end) }
    }
    let result = Article.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = (await result.sort(sortList)).reverse()
    } else {
        result = (await result.sort('createdAt')).reverse()
    }
    const articles = await result
    res.status(StatusCodes.OK).json({ articles })
})

//Create article. Check if tags are valid. Valid topics imported from /utils/tags.js
const createArticle = asyncWrapper(async (req, res) => {
    const { title, tags, content, weight, author, imageURL, description } = req.body
    const found = tags.every(r => topics.includes(r))
    if (found == false) {
        throw new BadRequestError("Tags are invalid")
    }
    const article = new Article({
        title,
        tags,
        description,
        content,
        weight,
        author,
        imageURL
    })
    const savedArticle = await article.save(article)
    res.status(StatusCodes.CREATED).json({ savedArticle })
})
//Get single article. Increase requests by 1. 
const getSingleArticle = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const article = await Article.findById(id)
    if (!article) {
        throw new NotFoundError("No article with that id")
    }
    if (article.requests == null) {
        let requests = 1
        await Article.findByIdAndUpdate(id, {
            requests
        }, {
            new: true,
            runValidators: true
        })
    } else {
        let requests = Number(article.requests) + 1
        await Article.findByIdAndUpdate(id, {
            requests
        },
            {
                new: true,
                runValidators: true
            })
    }
    res.status(StatusCodes.OK).json({ article })
})
//Update article. Check tags.
const updateArticle = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const { title, tags, content, weight, author, imageURL, description } = req.body
    if (tags != null) {
        const found = tags.every(r => topics.includes(r))
        if (found == false) {
            throw new BadRequestError("Tags are invalid")
        }
    }
    const article = await Article.findByIdAndUpdate(id, {
        title, tags, content, weight, author, imageURL, description
    }, {
        new: true,
        runValidators: true
    })
    if (!article) {
        throw new NotFoundError("Didn't find article")
    }
    res.status(StatusCodes.OK).json({ article })
})

//Delete article
const deleteArticle = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const article = await Article.findById(id)
    if (!article) {
        throw new NotFoundError("Didn't find article")
    }
    await Article.findByIdAndRemove(id)
    return res.status(StatusCodes.OK).json({ success: true })
})
module.exports = {
    getArticles,
    getFeed,
    createArticle,
    getSingleArticle,
    updateArticle,
    deleteArticle
}
