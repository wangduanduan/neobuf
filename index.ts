import { readFileSync } from 'node:fs';
import { Buffer } from 'node:buffer';
const BreakChar = '\n'
const LineBreak = Buffer.from(`${BreakChar}`)
const HeaderBreak = Buffer.from(`${BreakChar}${BreakChar}`)

type Position = [number, number]

class SIP {
    private readonly buf: Buffer
    firstLine: Position = [0, 0]
    headers: Position = [0, 0]
    body: Position = [0, 0]
    constructor(buf: Buffer) {
        this.buf = buf
        this.parseFirstLine()
        this.parseHeaders()
    }
    parseFirstLine() {
        const firstLinePosition = this.buf.indexOf(LineBreak)
        this.firstLine = [0, firstLinePosition]
    }
    parseHeaders() {
        const headersPosition = this.buf.indexOf(HeaderBreak, this.firstLine[1] + LineBreak.length)
        this.headers = [this.firstLine[1] + LineBreak.length, headersPosition]
    }
    ranger(start: number, end: number) {
        return this.buf.subarray(start, end)
    }
    printRanger(pos: Position) {
        console.log(this.buf.subarray(...pos).toString())
    }
}

const sip1 = readFileSync('./sip/invite1.sip')
const s1 = new SIP(sip1)
s1.printRanger(s1.firstLine)
s1.printRanger(s1.headers)
// console.log(s1.headers)
// console.log(LineBreak.toString('hex'), HeaderBreak.toString('hex'))
// console.log(sip1)

// const firstLinePosition = sip1.indexOf(LineBreak)
// const fl = sip1.subarray(0, firstLinePosition)
// console.log(fl.toString())