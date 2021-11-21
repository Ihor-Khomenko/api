import got from 'got'
import {strict as assert} from 'assert'

describe("User can", function () {
    it('Receive pet by id', async function () {
        const response = await got('http://localhost:80/v2/pet/1')
        const body = JSON.parse(response.body)

        assert(body.id == 1, `Expected API to reurn pet with id 1, but got ${body.id}`)
    })
})