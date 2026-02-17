import { describe, expect, test, vi, beforeEach, afterEach} from "vitest"
import { app } from "../index"
import request  from "supertest"
import { Request, Response } from "express"
import * as dogController from "../controllers/dogController"



// mock dogController module
vi.mock('../controllers/dogController')

// expected response
const expectedJson = {
    "success": true,
    "data": {
            "imageUrl": "https://images.dog.ceo/breeds/bulldog-french/n02108915_5669.jpg",
            "status": "success"
        }
}

// expected error response
const expectedErrorJson = {
    "success": false, 
    "error": "Failed to fetch dog image: Network error" 
}


describe('Dog routes', () => {
    
    beforeEach(() => {
        vi.clearAllMocks()
    })
    afterEach(() => {
        vi.resetAllMocks()
    })

    //Test 4:
    test('Positive Test: GET /api/dogs/random returns expected json', async () => {
        // mock implementation fo getDogImage
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (_req: Request, res: Response) => {
                res.status(200).json(expectedJson)
            }
        )

        // api call
        const res = await request(app) 
            .get('/api/dogs/random')

        expect(res.status).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.imageUrl).toBe(expectedJson.data.imageUrl)
    })

    // Test 5:
    test('Negative Test: GET /api/dogs/random returns 500 error', async () => {
        // mock implementation for getDogImage
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (_req: Request, res: Response) => {
                res.status(500).json(expectedErrorJson)
            }
        )

        // api call
        const res = await request(app)
            .get('/api/dogs/random')

        expect(res.status).toBe(500)
        expect(res.body.error).toBeDefined()
    })
})