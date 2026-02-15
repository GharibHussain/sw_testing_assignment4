import { describe, expect, test, vi} from "vitest";
import { getRandomDogImage } from "../services/dogService";

// mock response json
const mockedJson = {
            "message": "https:\/\/images.dog.ceo\/breeds\/mountain-swiss\/n02107574_988.jpg",
            "status": "success"
        };

// create a mock response for fetch
const createMockResponse = () => {
    const res = {} as any
    res.ok = true
    res.json = vi.fn().mockResolvedValue(mockedJson)
    return res
}


// Test 1
describe('dogService.getRandomDogImage', () => {
    test('Positive Test: return a result containing imageUrl and status', async () => {

        const fakeFetchResponse = createMockResponse()
        // mocked fetch
        const mockedFetch = vi.spyOn(global, 'fetch').mockResolvedValue(fakeFetchResponse)

        const result = await getRandomDogImage()
        
        expect(result.status).toBe(mockedJson.status)
        expect(result.imageUrl).toBe(mockedJson.message)

        expect(mockedFetch).toHaveBeenCalledOnce()
    })

    test('Negative Test: error is thrown when fetch reponse is not ok', async () => {

        // mock response for fetch with error
        const mockFetchResponseError = {
            "ok": false, 
            "status": 500 
        }

        // mocked fetch
        vi.spyOn(global, 'fetch').mockResolvedValue(mockFetchResponseError)
        
        expect(getRandomDogImage()).rejects.toThrowError(`Dog API returned status ${mockFetchResponseError.status}`)
        
    })
})