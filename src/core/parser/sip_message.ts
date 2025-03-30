import { Buffer } from 'node:buffer'
import type { header_map } from './header'
import { get_header_type, hdr } from './header'
import { LineBreak, LineBreakLen, LineBreak2, LineBreak2Len } from './const'
import {
    parse_start_line,
    type request_line,
    type status_line,
} from './first_line'
import { get_logger } from '../../modules/xlog'

const logger = get_logger('SIPMsg')
const emptyBuf = Buffer.from([])
const emptyObj = {}

export class SIPMsg {
    readonly rawBuf: Buffer
    firstLineBuf: Buffer = emptyBuf
    headerBuf: Buffer = emptyBuf
    bodyBuf: Buffer = emptyBuf

    hasError = false
    requestLine = <request_line>emptyObj
    statusLine = <status_line>emptyObj
    hm: header_map = new Map()
    isRequest: Boolean = false

    constructor(buf: Buffer) {
        this.rawBuf = buf

        const firstLineEnd = this.rawBuf.indexOf(LineBreak)

        if (firstLineEnd === -1) {
            this.hasError = true
            this.printErrorBuf()
            return
        }

        this.firstLineBuf = this.rawBuf.subarray(0, firstLineEnd + LineBreakLen)

        const start_line = parse_start_line(this.firstLineBuf.toString())
        if (!start_line) {
            logger.error(
                'parse first line failed: %s',
                this.firstLineBuf.toString()
            )
            this.hasError = true
            this.printErrorBuf()
            return
        }

        if ('method' in start_line) {
            this.requestLine = start_line as request_line
            this.isRequest = true
        } else {
            this.statusLine = start_line as status_line
            this.isRequest = false
        }

        const headerEnd = this.rawBuf.indexOf(
            LineBreak2,
            firstLineEnd + LineBreak.length
        )
        if (headerEnd === -1) {
            this.hasError = true
            this.printErrorBuf()
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
                this.hasError = true
                this.printErrorBuf()
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
    printErrorBuf() {
        logger.error('error buf: %s', this.rawBuf.toString())
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
