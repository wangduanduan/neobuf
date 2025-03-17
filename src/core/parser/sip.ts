import { Buffer } from 'node:buffer'
import type { header_map } from './header'
import { get_header_type, hdr } from './header'
import { LineBreak, LineBreakLen, LineBreak2, LineBreak2Len } from './const'

export class SIPMsg {
    readonly rawBuf: Buffer
    badBuf: Boolean = false

    firstLineBuf: Buffer = Buffer.from([])
    headerBuf: Buffer = Buffer.from([])
    hm: header_map = new Map()
    bodyBuf: Buffer = Buffer.from([])

    constructor(buf: Buffer) {
        this.rawBuf = buf

        const firstLineEnd = this.rawBuf.indexOf(LineBreak)

        if (firstLineEnd === -1) {
            this.badBuf = true
            return
        }

        this.firstLineBuf = this.rawBuf.subarray(0, firstLineEnd + LineBreakLen)

        const headerEnd = this.rawBuf.indexOf(
            LineBreak2,
            firstLineEnd + LineBreak.length
        )
        if (headerEnd === -1) {
            this.badBuf = true
            return
        }

        this.headerBuf = this.rawBuf.subarray(
            firstLineEnd + LineBreak.length,
            headerEnd + LineBreakLen
        )
        this.bodyBuf = this.rawBuf.subarray(headerEnd + LineBreak2Len)

        for (const it of this.parseLines()) {
            const [h, n] = get_header_type(it)
            if (h === hdr.invalid_header) {
                this.badBuf = true
                return
            }
            if (!this.hm.has(h)) {
                this.hm.set(h, [])
            }

            this.hm.get(h)?.push({
                rawBuf: it,
                name: n,
            })
        }
    }
    *parseLines() {
        let start = 0
        while (start < this.headerBuf.length) {
            const end = this.headerBuf.indexOf(LineBreak, start)
            if (end === -1) break
            yield this.headerBuf.subarray(start, end + LineBreak.length)
            start = end + LineBreak.length
        }
    }
}
