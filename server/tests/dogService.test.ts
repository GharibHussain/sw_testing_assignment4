import { afterEach, beforeEach, describe, expect, test, vi} from "vitest";
import { getRandomDogImage } from "../services/dogService";


// mock response json
const mockedJson = {
            "message": "https:\/\/images.dog.ceo\/breeds\/mountain-swiss\/n02107574_988.jpg",
            "status": "success"
        };

describe('dogService.getRandomDogImage', () => {
    beforeEach(() => { 
        global.fetch = vi.fn() 
    }) 
    afterEach(() => { 
        vi.clearAllMocks() 
        vi.resetAllMocks() 
    })

    // Test 1
    test('Positive Test: return a result containing imageUrl and status', async () => {

        const fakeFetchResponse = {
            ok: true,
            json: async () => (mockedJson)
        }

        // mocked fetch
        const mockedFetch = vi.mocked(fetch).mockResolvedValue(fakeFetchResponse as Response)

        const result = await getRandomDogImage()
        
        expect(result.status).toBe(mockedJson.status)
        expect(result.imageUrl).toBe(mockedJson.message)

        expect(mockedFetch).toHaveBeenCalledOnce()
    })

    // Test 2
    test('Negative Test: error is thrown when fetch reponse is not ok', async () => {

        // mock response for fetch with error
        const fakeFetchResponseError = {
            ok: false, 
            status: 500 
        }

        // mocked fetch
        vi.mocked(fetch).mockResolvedValue(fakeFetchResponseError as Response)
        
        await expect(getRandomDogImage()).rejects.toThrow(
            `Dog API returned status ${fakeFetchResponseError.status}`
        )
        
    })
})