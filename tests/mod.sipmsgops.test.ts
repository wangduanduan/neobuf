import { expect, test } from "bun:test";
import { hdr, type header_map } from "../src/core/parser/header";

import { has_header } from "../src/modules/sipmsgops";

test('sipmsgops.has_header', () => {
    const data: header_map = new Map()

    data.set(hdr.accept, [{
        rawBuf: Buffer.from("Accept: application/sdp\r\n")
    }])

    expect(has_header({ hm: data }, hdr.accept)).toBeTrue();
    expect(has_header({ hm: data }, hdr.max_forwards)).toBeFalse();
})