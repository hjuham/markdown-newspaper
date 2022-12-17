const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/User')
const testUsers = require('./users.json')
const app = require('../index')
const api = supertest(app)
const session = require('supertest-session')

let testSession = null

describe('User tests', () => {
    beforeAll(async () => {
        testSession = session(app)
    })
    beforeEach(async () => {
        await User.deleteMany({})
        await User.create(testUsers)
        await testSession
            .post('/api/login/password')
            .send('username=admin@admin.com&password=secret')
            .expect(200)
    })
    test('Users returned as json', async () => {
        const response = await testSession
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.users).toHaveLength(4)
    })
    test('Query user by email', async () => {
        const response = await testSession
            .get('/api/users?email=test2@test.com')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.users[0]).toHaveProperty('email', 'test2@test.com')
    })
    test('User by id', async () => {
        const response = await testSession
            .get('/api/users/636a3da4bdc320dbedcb22c3')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.user).toHaveProperty('email', 'admin@admin.com')
    })
    test('Create user', async () => {
        const newUser = {
            email: "new@new.com",
            role: "regular",
            interests: ["Politics"],
            password: "secret"
        }
        const response = await testSession
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response2 = await testSession
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response2.body.users).toHaveLength(4)
    })
    test('Delete user', async () => {
        const response = await testSession
            .delete('/api/users/636a3da4bdc320dbedcb22c3')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toHaveProperty('success', true)
    })
    test('Update user', async () => {
        const updatedUser = {
            email: "new@email.com"
        }
        const response = await testSession
            .put('/api/users/636a3da4bdc320dbedcb22c3')
            .send(updatedUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.user).toHaveProperty('email', 'new@email.com')
    })
    afterAll(async () => {
        mongoose.connection.close()
    })
})