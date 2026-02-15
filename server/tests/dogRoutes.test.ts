import { describe, expect, test, vi} from "vitest"
import { app } from "../index"
import request  from "supertest"
import * as dogService from "../services/dogService"


const expectedJson = {
    "success": true,
    "data": {
            "imageUrl": "https://images.dog.ceo/breeds/bulldog-french/n02108915_5669.jpg",
            "status": "success"
        }
}

const expectedErrorJson = {
    "success": false, 
    "error": "Failed to fetch dog image: Network error" 
}


describe('Dog routes', () => {
    test('Positive Test: GET /api/dogs/random returns expected json', async () => {
        // mock dogService
        vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(expectedJson.data)

        // api call
        const res = await request(app) 
            .get('/api/dogs/random')

        expect(res.status).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.imageUrl).toBe(expectedJson.data.imageUrl)
    })

    test('Negative Test: GET /api/dogs/random returns 500 error', async () => {
        // mock dogService
        vi.spyOn(dogService, 'getRandomDogImage').mockRejectedValue(new Error(expectedErrorJson.error))

        // api call
        const res = await request(app)
            .get('/api/dogs/random')

        expect(res.status).toBe(500)
        expect(res.body).toEqual(expectedErrorJson)
    })
})