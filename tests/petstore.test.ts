import got from 'got'
import {strict as assert} from 'assert'
import {URLSearchParams} from 'url'

describe('User can: ', function () {
    it('Find pet by id', async function () {
        let response = await got('http://localhost:80/v2/pet/1')
        let body = JSON.parse(response.body)

        assert(body.id == 1, `Expected API to reurn pet with id 1, but got ${body.id}`)
    })

    it('Find pet by status', async function() {
        let response = await got('http://localhost/v2/pet/findByStatus', {
            searchParams: { status: 'available' } 
        })
        let body = JSON.parse(response.body)
        assert(body.length > 0)

        response = await got('http://localhost/v2/pet/findByStatus', {
            searchParams: { status: 'pending' }
        })
        body = JSON.parse(response.body)
        assert(body.length > 0)

        response = await got('http://localhost/v2/pet/findByStatus', {
            searchParams: { status: 'sold' }
        })
        body = JSON.parse(response.body)
        assert(body.length > 0)

        response = await got('http://localhost/v2/pet/findByStatus', {
            searchParams: new URLSearchParams({ status: ['available', 'pending'] }) //urlsearchparams configures usl search param to the correct format
        })
        body = JSON.parse(response.body)
        assert(body.length > 0)
        assert(body.some((pet: any) => pet.status == 'available')) // some returns true if at least one element i array is true
        assert(body.some((pet: any) => pet.status == 'pending')) // returns true if pending found in resposne
        assert(!body.some((pet: any) => pet.status == 'sold')) // returns true if no elements with sold returned
    })

    it('Get pet by tag', async function() 
    {
        
    })
})