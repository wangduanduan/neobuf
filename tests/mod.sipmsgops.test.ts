import { expect, test, describe, beforeEach } from 'bun:test'
import { hdr, type header_map } from '../src/core/parser/header'

import {
    has_header,
    unshift_header,
    shift_header,
    push_header,
    get_header_count,
} from '../src/modules/sipmsgops'

interface ctx {
    hm: header_map
}

test('sipmsgops.has_header', () => {
    const data: header_map = new Map()

    data.set(hdr.accept, [
        {
            rawBuf: Buffer.from('Accept: application/sdp\r\n'),
            name: 'Accept',
        },
    ])
    data.set(hdr.other, [
        {
            rawBuf: Buffer.from('X-Accept: application/sdp\r\n'),
            name: 'X-Accept',
        },
    ])

    expect(has_header({ hm: data }, 'Accept')).toBeTrue()
    expect(has_header({ hm: data }, 'Accept')).toBeTrue()
    expect(has_header({ hm: data }, 'Accept1: ')).toBeFalse
    expect(has_header({ hm: data }, 'X-Accept')).toBeTrue()
})

test('sipmsgops.unshift_header', () => {
    const data: header_map = new Map()

    data.set(hdr.accept, [
        {
            rawBuf: Buffer.from('Accept: application/sdp\r\n'),
            name: 'Accept',
        },
    ])
    data.set(hdr.other, [
        {
            rawBuf: Buffer.from('X-Accept: application/sdp\r\n'),
            name: 'X-Accept',
        },
    ])

    const d = { hm: data }

    expect(unshift_header(d, 'Max-Forwards', '10\r\n')).toBeTrue()
    expect(unshift_header(d, 'Max-Forwards', '10\r\n')).toBeTrue()

    expect(has_header(d, 'Max-Forwards')).toBeTrue()
    expect(data.get(hdr.max_forwards)?.length).toBe(2)
    expect(data.get(hdr.max_forwards)![0]).toEqual({
        name: 'Max-Forwards',
        parsed_s: 'Max-Forwards: 10\r\n',
    })
})

describe('sipmsgops.shift_header', () => {
    let testCtx: ctx

    beforeEach(() => {
        testCtx = {
            hm: new Map(),
        }
    })

    test('should return false when header_name is empty', () => {
        expect(shift_header(testCtx, '')).toBe(false)
    })

    test('should return false when header_name is not found in the map', () => {
        testCtx.hm.set(hdr.content_type, [{ name: 'Content-Type' }])
        expect(shift_header(testCtx, 'X-Custom-Header')).toBe(false)
        expect(shift_header(testCtx, 'Content-Type')).toBe(true)
    })

    test('should return true and shift header when header_name is found in the map', () => {
        testCtx.hm.set(hdr.other, [
            { name: 'P-Content-Type' },
            { name: 'X-Custom-Header' },
            { name: 'M-Custom-Header' },
        ])
        expect(shift_header(testCtx, 'X-Custom-Header')).toBe(true)
        expect(testCtx.hm.get(hdr.other)![0].name).toBe('P-Content-Type')
        expect(testCtx.hm.get(hdr.other)![1].name).toBe('M-Custom-Header')
        expect(testCtx.hm.get(hdr.other)!.length).toBe(2)
    })
})

test('sipmsgops.get_header_count', () => {
    const data: header_map = new Map()

    data.set(hdr.accept, [
        {
            rawBuf: Buffer.from('Accept: application/sdp\r\n'),
            name: 'Accept',
        },
        {
            rawBuf: Buffer.from('Accept: application/sdp\r\n'),
            name: 'Accept',
        },
    ])
    data.set(hdr.other, [
        {
            rawBuf: Buffer.from('X-Accept: application/sdp\r\n'),
            name: 'X-Accept',
        },
        {
            rawBuf: Buffer.from('X1-Accept: application/sdp\r\n'),
            name: 'X1-Accept',
        },
        {
            rawBuf: Buffer.from('X-Accept: application/sdp\r\n'),
            name: 'X-Accept',
        },
    ])

    const testCtx: ctx = { hm: data }
    expect(get_header_count(testCtx, 'Accept')).toBe(2)
    expect(get_header_count(testCtx, 'X-Accept')).toBe(2)
})

describe('sipmsgops.push_header', () => {
    let testCtx: ctx

    beforeEach(() => {
        testCtx = {
            hm: new Map(),
        }
    })

    test('test1', () => {
        expect(push_header(testCtx, '', '')).toBe(false)
    })

    test('test2', () => {
        testCtx.hm.set(hdr.content_type, [{ name: 'Content-Type' }])
        expect(push_header(testCtx, 'X-Custom-Header', 'abc\r\n')).toBe(true)
        expect(push_header(testCtx, 'Content-Type', 'abc\r\n')).toBe(true)
        expect(get_header_count(testCtx, 'Content-Type')).toBe(2)
        expect(get_header_count(testCtx, 'X-Content-Type')).toBe(0)
        expect(get_header_count(testCtx, 'X-Custom-Header')).toBe(1)
    })
})
