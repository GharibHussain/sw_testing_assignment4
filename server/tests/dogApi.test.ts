import { describe, expect, test } from 'vitest' 
import request from 'supertest' 
import { app } from '../index' 

// API test
describe('Dog API', () => {
    // Test 1
    test('GET /api/dogs/random returns a random dog breed', async () => {
        const res = await request(app)
            .get('/api/dogs/random')

        expect(res.status).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('imageUrl')
        expect(res.body.data.imageUrl).toBeTypeOf('string')
    })

    // Test 2
    test('GET /api/dogs/invalid returns an error', async () => {
        const res = await request(app)
            .get('/api/dogs/invalid')

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')

        // expexted error response
        const fakeResponse = {
            "success": false,
            "error": "Route not found"
        }
        expect(res.body).toEqual(fakeResponse)
        
    })
})