const request = require('supertest');
const mongoose = require('mongoose');
const connectTestDB = require('../config/config/testDBConfig');
const app = require('../src/app');
const User = require('../src/models/userModel');

let server;

beforeAll(async () => {
    await connectTestDB(); // Connect to test database
    server = app.listen(0); // Start server on random port
});

beforeEach(async () => {
    await User.deleteMany({}); // Clear users before each test
});

afterAll(async () => {
    await mongoose.connection.close(); // Close DB connection
    await server.close(); // Close the server
});

describe('User Controller', () => {
    let token;

    beforeEach(async () => {
        // Create user and login before each test
        await request(server)
            .post('/api/auth/signup')
            .send({ name: 'Test User', email: 'test4@example.com', password: 'password123' });

        const loginRes = await request(server)
            .post('/api/auth/login')
            .send({ email: 'test4@example.com', password: 'password123' });
        token = loginRes.body.token;
    });

    it('should create a new user', async () => {
        const res = await request(server)
            .post('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'New User',
                email: 'newuser@example.com',
                role: 'user'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('user');
    });

    it('should get all users', async () => {
        const res = await request(server)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.users).toHaveLength(1); // Includes user from beforeEach
    });

    it('should get a single user', async () => {
        const user = await User.findOne({ email: 'test4@example.com' });
        expect(user).not.toBeNull(); // Check for null user object
        const res = await request(server)
            .get(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.user.email).toBe('test4@example.com');
    });

    it('should update a user', async () => {
        const user = await User.findOne({ email: 'test4@example.com' });
        expect(user).not.toBeNull(); // Check for null user object
        const res = await request(server)
            .put(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated User' });
        expect(res.statusCode).toBe(200);
        expect(res.body.user.name).toBe('Updated User');
    });

    it('should delete a user', async () => {
        const user = await User.findOne({ email: 'test4@example.com' });
        expect(user).not.toBeNull(); // Check for null user object
        const res = await request(server)
            .delete(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('User deleted successfully');
    });
});