import { expect, test } from 'bun:test'
import { parse_start_line } from '../../src/core/parser/first_line'

const test_cases = [
    {
        in: 'INVITE sip:bob@biloxi.com SIP/2.0',
        out: {
            method: 'INVITE',
            request_uri: 'sip:bob@biloxi.com',
            sip_version: 'SIP/2.0',
        },
    },
    {
        in: 'SIP/2.0 200 OK',
        out: {
            sip_version: 'SIP/2.0',
            status_code: 200,
            reason_phrase: 'OK',
        },
    },
    {
        in: 'SIP/2.0 481 Call Leg/Transaction Does Not Exist',
        out: {
            sip_version: 'SIP/2.0',
            status_code: 481,
            reason_phrase: 'Call Leg/Transaction Does Not Exist',
        },
    },
    {
        in: 'SIP/2.0 404 Not Found',
        out: {
            sip_version: 'SIP/2.0',
            status_code: 404,
            reason_phrase: 'Not Found',
        },
    },
    {
        in: 'SIP/2.0 500 Server Internal Error',
        out: {
            sip_version: 'SIP/2.0',
            status_code: 500,
            reason_phrase: 'Server Internal Error',
        },
    },
    {
        in: 'SIP/2.0 500',
        out: undefined,
    },
]

test('parse_start_line', () => {
    for (const { in: line, out } of test_cases) {
        expect(parse_start_line(line)).toEqual(out)
    }
})
