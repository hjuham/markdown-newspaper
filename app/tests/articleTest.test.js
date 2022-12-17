const mongoose = require('mongoose')
const supertest = require('supertest')
const Article = require('../models/Article')
const User = require('../models/User')
const testArticles = require('./articles.json')
const testUsers = require('./users.json')
const app = require('../index')
const api = supertest(app)
const session = require('supertest-session')

let testSession = null

describe('Article tests', () => {
    beforeAll(async () => {
        testSession = session(app)
    })
    beforeEach(async () => {
        await Article.deleteMany({})
        await Article.create(testArticles)
        await User.deleteMany({})
        await User.create(testUsers)
        await testSession
            .post('/api/login/password')
            .send('username=admin@admin.com&password=secret')
            .expect(200)
    })
    test('Articles returned as json', async () => {
        const response = await testSession
            .get('/api/articles')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.articles).toHaveLength(testArticles.length)
    })
    test('Articles query', async () => {
        const response = await testSession
            .get('/api/articles?title=test+title+3&author=test+author+3')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.articles).toHaveLength(1)
    })
    test('Articles query with date', async () => {
        const response = await testSession
            .get('/api/articles?start=2023')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.articles).toHaveLength(0)
        const response2 = await testSession
            .get('/api/articles?start=2022&end=2023')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response2.body.articles).toHaveLength(3)
    })
    test('Articles sort', async () => {
        const response = await testSession
            .get('/api/articles?sort=weight')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.articles[2]).toHaveProperty('weight', 5)
    })
    test('Article query by tags', async () => {
        const response = await testSession
            .get('/api/articles?tags=Entertainment')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.articles[0]).toHaveProperty('title', 'test title 3')
    })
    test('Article by id', async () => {
        const response = await testSession
            .get('/api/articles/636a3da4bdc320dbedcb22c3')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.article).toHaveProperty('title', 'test title 1')
    })
    test('Article update', async () => {
        const updatedArticle = {
            title: "new title"
        }
        const response = await testSession
            .put('/api/articles/636a3da4bdc320dbedcb22c3')
            .send(updatedArticle)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.article).toHaveProperty('title', 'new title')
    })
    test('Article post', async () => {
        const newArticle = {
            title: "new title",
            author: "new author",
            content: "content",
            tags: ['Politics'],
            imageURL: "google.com",
        }
        const response = await testSession
            .post('/api/articles')
            .send(newArticle)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response2 = await testSession
            .get('/api/articles')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response2.body.articles).toHaveLength(4)
    })
    test('Delete article', async () => {
        const response = await testSession
            .delete('/api/articles/636a3da4bdc320dbedcb22c3')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toHaveProperty('success', true)
    })
    afterAll(async () => {
        mongoose.connection.close()
    })
})