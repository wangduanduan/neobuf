/*
generic-message  =  start-line
                    *message-header
                    CRLF
                    [ message-body ]
start-line       =  Request-Line / Status-Line

Request-Line =  Method SP Request-URI SP SIP-Version CRLF
Status-Line  =  SIP-Version SP Status-Code SP Reason-Phrase CRLF
*/

export interface request_line {
    method: string
    request_uri: string
    sip_version: string
}

export interface status_line {
    sip_version: string
    status_code: number
    reason_phrase: string
}

export type start_line = request_line | status_line | undefined

export function build_start_line(sl: start_line): string {
    if (sl === undefined) {
        return ''
    }

    if ('status_code' in sl) {
        return `${sl.sip_version} ${sl.status_code} ${sl.reason_phrase}`
    }

    return `${sl.method} ${sl.request_uri} ${sl.sip_version}`
}

export function parse_start_line(line: string): start_line {
    line = line.trim()

    if (line === '') {
        return
    }

    const fs1 = line.indexOf(' ')
    const fs2 = line.indexOf(' ', fs1 + 1)

    if (fs1 === -1 || fs2 === -1) {
        return
    }

    const ma1 = line.substring(0, fs1)
    const ma2 = line.substring(fs1 + 1, fs2)
    const ma3 = line.substring(fs2 + 1)

    if (ma1 === 'SIP/2.0') {
        return {
            sip_version: ma1,
            status_code: parseInt(ma2),
            reason_phrase: ma3,
        }
    }

    return {
        method: ma1,
        request_uri: ma2,
        sip_version: ma3,
    }
}
