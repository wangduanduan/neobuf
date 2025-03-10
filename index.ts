import { readFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';
// \n 0x0A LF
// \r 0x0D CR
const BreakChar = '\n'
const LineBreak = Buffer.from(`${BreakChar}`)
const LineBreakLen = LineBreak.length
const LineBreak2 = Buffer.from(`${BreakChar}${BreakChar}`)
const LineBreak2Len = LineBreak2.length

type HeaderList = Buffer[];

interface HeaderLine<T> {
    readonly ln: Buffer
    parsed: T
}

interface HF_CSEQ {

}
interface HF_VIA {

}

interface Headers {
    cseq?: HeaderLine<HF_CSEQ>
    via?: HeaderLine<HF_VIA>[]
};

class SIP {
    private readonly rawBuf: Buffer
    private badBuf: Boolean = false

    firstLineBuf: Buffer = Buffer.from([])
    headerBuf: Buffer = Buffer.from([])
    bodyBuf: Buffer = Buffer.from([])
    headers: Headers = {}

    constructor(buf: Buffer) {
        this.rawBuf = buf

        const firstLineEnd = this.rawBuf.indexOf(LineBreak)

        if (firstLineEnd === -1) {
            this.badBuf = true
            return
        }

        this.firstLineBuf = this.rawBuf.subarray(0, firstLineEnd + LineBreakLen)

        const headerEnd = this.rawBuf.indexOf(LineBreak2, firstLineEnd + LineBreak.length)
        if (headerEnd === -1) {
            this.badBuf = true
            return
        }

        this.headerBuf = this.rawBuf.subarray(firstLineEnd + LineBreak.length, headerEnd + LineBreakLen)
        this.bodyBuf = this.rawBuf.subarray(headerEnd + LineBreak2Len)
    }

}

const sip1 = readFileSync('./sip/invite1.sip')
const s1 = new SIP(sip1)

console.log(s1.firstLineBuf.toString('hex'))
console.log(s1.headerBuf.toString('hex'))
console.log(s1.bodyBuf.toString('hex'))
// console.log(s1.headers)
// console.log(LineBreak.toString('hex'), HeaderBreak.toString('hex'))
// console.log(sip1)

// const firstLinePosition = sip1.indexOf(LineBreak)
// const fl = sip1.subarray(0, firstLinePosition)
// console.log(fl.toString())