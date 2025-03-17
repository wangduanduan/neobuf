import { expect, test } from 'bun:test'
import { hdr, type header_map } from '../src/core/parser/header'

import { has_header, unshift_header } from '../src/modules/sipmsgops'

test('sipmsgops.has_header', () => {
    const data: header_map = new Map()

    data.set(hdr.accept, [
        {
            rawBuf: Buffer.from('Accept: application/sdp\r\n'),
            name: 'Accept: ',
        },
    ])
    data.set(hdr.other, [
        {
            rawBuf: Buffer.from('X-Accept: application/sdp\r\n'),
            name: 'X-Accept: ',
        },
    ])

    expect(has_header({ hm: data }, 'Accept')).toBeTrue()
    expect(has_header({ hm: data }, 'Accept: ')).toBeTrue()
    expect(has_header({ hm: data }, 'Accept1: ')).toBeFalse
    expect(has_header({ hm: data }, 'X-Accept: ')).toBeTrue()
})

test('sipmsgops.unshift_header', () => {
    const data: header_map = new Map()

    data.set(hdr.accept, [
        {
            rawBuf: Buffer.from('Accept: application/sdp\r\n'),
            name: 'Accept: ',
        },
    ])
    data.set(hdr.other, [
        {
            rawBuf: Buffer.from('X-Accept: application/sdp\r\n'),
            name: 'X-Accept: ',
        },
    ])

    const d = { hm: data }

    expect(unshift_header(d, 'Max-Forwards', '10\r\n')).toBeTrue()
    expect(unshift_header(d, 'Max-Forwards', '10\r\n')).toBeTrue()

    expect(has_header(d, 'Max-Forwards')).toBeTrue()
    expect(data.get(hdr.max_forwards)?.length).toBe(2)
    expect(data.get(hdr.max_forwards)![0]).toEqual({
        name: 'Max-Forwards: ',
        parsed_s: 'Max-Forwards: 10\r\n',
    })
})
