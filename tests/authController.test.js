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

describe('Auth Controller', () => {
    describe('POST /api/auth/signup', () => {
        it('should create a new user', async () => {
            const res = await request(server)
                .post('/api/auth/signup')
                .send({
                    name: 'Test User',
                    email: 'test1@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'User created successfully');
        });

        it('should return 400 for duplicate email', async () => {
            // First signup
            await request(server)
                .post('/api/auth/signup')
                .send({
                    name: 'Test User',
                    email: 'test2@example.com',
                    password: 'password123'
                });

            // Duplicate signup
            const res = await request(server)
                .post('/api/auth/signup')
                .send({
                    name: 'Another User',
                    email: 'test2@example.com',
                    password: 'password456'
                });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('message', 'Email already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login and return a token', async () => {
            // Create user
            await request(server)
                .post('/api/auth/signup')
                .send({
                    name: 'Test User',
                    email: 'test3@example.com',
                    password: 'password123'
                });

            // Login
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'test3@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should return 401 for invalid credentials', async () => {
            // Attempt login without creating user
            const res = await request(server)
                .post('/api/auth/login')
                .send({
                    email: 'invalid@example.com',
                    password: 'wrongpassword'
                });
            expect(res.statusCode).toBe(401);
        });
    });
});