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

describe('Authentication tests', () => {
    beforeAll(async () => {
        testSession = session(app)
    })
    beforeEach(async () => {
        await Article.deleteMany({})
        await Article.create(testArticles)
        await User.deleteMany({})
        await User.create(testUsers)
    })
    test('Login', async () => {
        const response = await testSession
            .post('/api/login/password')
            .send('username=test@test.com&password=secret')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toHaveProperty("success", true)
    })
    test('Fail login', async () => {
        await testSession
            .post('/api/login/password')
            .send('username=wrong&password=wrong')
            .expect(401)
    })
    test('Fail a protected route', async () => {
        await testSession
            .get('/api/users')
            .expect(401)
    })
    test('Logout, try to access protected route', async () => {
        const response = await testSession
            .post('/api/login/password')
            .send('username=admin@admin.com&password=secret')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toHaveProperty("success", true)
        const response2 = await testSession
            .post('/api/login/logout')
            .send()
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response2.body).toHaveProperty("success", true)
        const response3 = await testSession
            .get('/api/users')
            .expect(401)
        expect(response3.body).toHaveProperty("msg", "Not authenticated")
    })
    afterAll(async () => {
        mongoose.connection.close()
    })
})