import { expect, test } from "bun:test";

import { hdr_type_map_s, hdr, get_header_type } from "../src/core/parser/header";

test('hdr_type_map_s', () => {
    const h = hdr_type_map_s()
    expect(h.get('WWW-Authenticate: ')).toBe(hdr.www_authenticate)
})

test('get_header_type', () => {
    let h = get_header_type(Buffer.from('WWW-Authenticate: abcde\r\n'))
    expect(h).toBe(hdr.www_authenticate)

    h = get_header_type(Buffer.from('Via: abcde\r\n'))
    expect(h).toBe(hdr.via)

    h = get_header_type(Buffer.from('XVia: abcde\r\n'))
    expect(h).toBe(hdr.other)

    h = get_header_type(Buffer.from('XVia abcde\r\n'))
    expect(h).toBe(hdr.invalid_header)
})