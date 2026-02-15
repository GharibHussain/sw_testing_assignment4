import { describe, expect, test, vi} from "vitest";
import { getDogImage } from "../controllers/dogController";  
import * as dogService from "../services/dogService"

// mock response for getDogImage function
const mockedJson = {
            "imageUrl": "https://images.dog.ceo/breeds/bulldog-french/n02108915_5669.jpg",
            "status": "success"
        };

// create mock response
const createMockResponse = () => {
    const res: any = {}
    res.json = vi.fn()
    return res
}

// Test 3
describe('dogController.getDogImage', () => {
    test('Positive Test: return a dog image URL with valid request', async () => {
        // fake request
        const req: any = {}
        // fake response
        const res = createMockResponse()

        // mock getRandomDogImage 
        vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockedJson)

        await getDogImage(req, res)
        
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: mockedJson
        })
    })
   
})