import { expect, test } from "bun:test";
import { SIPMsg } from "../src/core/parser/sip";
import { readFileSync } from 'node:fs';
import { hdr } from "../src/core/parser/header";


test('hm-01', () => {
    const invite1 = readFileSync('sip/invite1.sip')
    const s1 = new SIPMsg(invite1)
    expect(s1.hm.get(hdr.via)?.length).toBe(1)

    // @ts-ignore
    expect(s1.hm.get(hdr.via)[0]?.rawBuf.toString()).toBe('Via: SIP/2.0/UDP 192.168.99.100:5040\r\n')

    // @ts-ignore
    expect(s1.hm.get(hdr.user_agent)[0]?.rawBuf.toString()).toBe('User-Agent: Cisco-SIP-IP-Phone/2\r\n')

    // @ts-ignore
    expect(s1.hm.get(hdr.content_length)[0]?.rawBuf.toString()).toBe('Content-Length: 218\r\n')
})