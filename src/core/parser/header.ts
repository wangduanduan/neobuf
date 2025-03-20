export enum hdr {
    accept /*!< Accept header field */,
    accept_contact /*!< Accept-Contact header */,
    accept_language /*!< Accept-Language header field */,
    allow /*!< Allow header field */,
    allow_events /*!< Allow-Events header */,
    authorization /*!< Authorization header field */,
    callid /*!< Call-Id header field */,
    callinfo /*!< Call-Info header field*/,
    contact /*!< Contact header field */,
    content_disposition /*!< Content-Disposition hdr field */,
    content_encoding /*!< Content-Encoding header */,
    content_length /*!< Content-Length header field */,
    content_type /*!< Content-Type header field */,
    cseq /*!< CSeq header field */,
    date /*!< Date header field */,
    diversion /*!< Diversion header field */,
    eoh /*!< End of message header (lastid + 1) */,
    error /*!< Error while parsing */,
    event /*!< Event header field */,
    expires /*!< Expires header field */,
    from /*!< From header field */,
    identity /*!< Identity header field */,
    identity_info /*!< Identity-info header field */,
    invalid_header,
    max_forwards /*!< MaxForwards header field */,
    min_expires /*!< Min-Expires header */,
    min_se /*!< Min-SE */,
    organization /*!< Organization header field */,
    other /*!< Some other header field */,
    pai /*!< P-Asserted-Identity header field*/,
    path /*!< Path header field */,
    ppi /*!< P-Preferred-Identity header field*/,
    priority /*!< Priority header field */,
    privacy /*!< Privacy header field */,
    proxy_auth /*!< Proxy-Authorization hdr field */,
    proxy_authenticate /*!< Proxy-Authenticate header field */,
    proxy_require /*!< Proxy-Require header field */,
    reason /**< Reason header field */,
    record_route /*!< Record-Route header field */,
    refer_to /*!< Refer-To header fiels */,
    referred_by /*!< Referred-By header */,
    reject_contact /*!< Reject-Contact header */,
    request_disposition /*!< Request-Disposition header */,
    require /*!< Require header */,
    retry_after /*!< Retry-After header field */,
    route /*!< Route header field */,
    rpid /*!< Remote-Party-ID header field */,
    server /*!< Server header field */,
    session_expires /*!< Session-Expires header */,
    sip_if_match /*!< SIP-If-Match header field */,
    subject /*!< Subject header field */,
    subscription_state /*!< Subscription-State */,
    supported /*!< Supported  header field */,
    to /*!< To header field */,
    unsupported /*!< Unsupported header field */,
    user_agent /*!< User-Agent header field */,
    via /*!< Via header field */,
    via1 /*!< First Via header field */,
    via2 /*!< only used as flag */,
    www_authenticate /*!< WWW-Authenticate header field */,
}

export enum sip_method {
    ack /*!< ACK method */,
    bye /*!< BYE method */,
    cancel /*!< CANCEL method */,
    info /*!< INFO method */,
    invite /*!< INVITE method */,
    message /*!< MESSAGE method */,
    notify /*!< NOTIFY method */,
    options /*!< OPTIONS method */,
    prack /*!< PRACK method */,
    publish /*!< PUBLISH method */,
    register /*!< REGISTER method */,
    subscribe /*!< SUBSCRIBE method */,
    update /*!< UPDATE method */,
}

export enum sip_status {
    trying /*!< Trying */,
    ringing /*!< Ringing */,
    call_is_being_forwarded /*!< Call Is Being Forwarded */,
    queued /*!< Queued */,
    session_progress /*!< Session Progress */,
    ok /*!< OK */,
    bad_request /*!< Bad Request */,
    unauthorized /*!< Unauthorized */,
    payment_required /*!< Payment Required */,
    forbidden /*!< Forbidden */,
    not_found /*!< Not Found */,
    method_not_allowed /*!< Method Not Allowed */,
    not_acceptable /*!< Not Acceptable */,
    proxy,
}

export enum header_operation {
    add,
    del,
    chg,
}

interface header_node {
    readonly rawBuf?: Buffer
    name: string
    parsed_s?: string
    parsed?: any
}

export type header_map = Map<hdr, header_node[]>

interface hdr_type_i {
    [index: number]: string
}

export const hdr_type_s: hdr_type_i = {
    [hdr.accept_contact]: 'Accept-Contact',
    [hdr.accept_language]: 'Accept-Language',
    [hdr.accept]: 'Accept',
    [hdr.allow_events]: 'Allow-Events',
    [hdr.allow]: 'Allow',
    [hdr.authorization]: 'Authorization',
    [hdr.callid]: 'Call-ID',
    [hdr.callinfo]: 'Call-Infoate',
    [hdr.contact]: 'Contact',
    [hdr.content_disposition]: 'Content-Disposition',
    [hdr.content_encoding]: 'Content-Encoding',
    [hdr.content_length]: 'Content-Length',
    [hdr.content_type]: 'Content-Type',
    [hdr.cseq]: 'CSeq',
    [hdr.date]: 'Date',
    [hdr.diversion]: 'Diversion',
    [hdr.event]: 'Event',
    [hdr.expires]: 'Expires',
    [hdr.from]: 'From',
    [hdr.identity_info]: 'Identity-info',
    [hdr.identity]: 'Identity',
    [hdr.max_forwards]: 'Max-Forwards',
    [hdr.min_expires]: 'Min-Expires',
    [hdr.min_se]: 'Min-SE',
    [hdr.organization]: 'Organization',
    [hdr.pai]: 'P-Asserted-Identity',
    [hdr.path]: 'Path',
    [hdr.ppi]: 'P-Preferred-Identity',
    [hdr.priority]: 'Priority',
    [hdr.privacy]: 'Privacy',
    [hdr.proxy_auth]: 'Proxy-Authorization',
    [hdr.proxy_authenticate]: 'Proxy-Authenticate',
    [hdr.proxy_require]: 'Proxy-Require',
    [hdr.reason]: 'Reason',
    [hdr.record_route]: 'Record-Route',
    [hdr.refer_to]: 'Refer-To',
    [hdr.referred_by]: 'Referred-By',
    [hdr.reject_contact]: 'Reject-Contact',
    [hdr.request_disposition]: 'Request-Disposition',
    [hdr.require]: 'Require',
    [hdr.retry_after]: 'Retry-After',
    [hdr.route]: 'Route',
    [hdr.rpid]: 'Remote-Party-ID',
    [hdr.server]: 'Server: ',
    [hdr.session_expires]: 'Session-Expires',
    [hdr.sip_if_match]: 'SIP-If-Match',
    [hdr.subject]: 'Subject',
    [hdr.subscription_state]: 'Subscription-State',
    [hdr.supported]: 'Supported',
    [hdr.to]: 'To',
    [hdr.unsupported]: 'Unsupported',
    [hdr.user_agent]: 'User-Agent',
    [hdr.via]: 'Via',
    [hdr.www_authenticate]: 'WWW-Authenticate',
}

export function hdr_type_map_s(): Map<string, hdr> {
    const map_s = new Map<string, hdr>()
    for (const it in hdr_type_s) {
        map_s.set(hdr_type_s[it], parseInt(it))
    }
    return map_s
}
export const hdr_type_name = hdr_type_map_s()

const headerFlag = Buffer.from(':')
export function get_header_type(buf: Buffer): [hdr, string] {
    const start = buf.indexOf(headerFlag)

    if (start === -1) {
        return [hdr.invalid_header, '']
    }

    if (buf.length <= start + headerFlag.length) {
        return [hdr.invalid_header, '']
    }

    const head_name = buf.subarray(0, start).toString()

    if (hdr_type_name.has(head_name)) {
        return [hdr_type_name.get(head_name)!, head_name]
    }

    return [hdr.other, head_name]
}
