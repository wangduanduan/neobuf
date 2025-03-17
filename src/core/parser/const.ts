// \n 0x0A LF
// \r 0x0D CR

export const BreakChar = '\r\n'
export const LineBreak = Buffer.from(`${BreakChar}`)
export const LineBreakLen = LineBreak.length
export const LineBreak2 = Buffer.from(`${BreakChar}${BreakChar}`)
export const LineBreak2Len = LineBreak2.length
