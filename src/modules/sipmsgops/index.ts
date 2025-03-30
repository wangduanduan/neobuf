import { hdr } from '../../core/parser/header'
import { type header_map, hdr_type_name } from '../../core/parser/header'

const header_split = ': '

interface ctx {
    hm: header_map
}

export function has_totag(ctx: ctx): boolean {
    return false
}

export function remove_header(ctx: ctx, header_name: hdr): void {}

export function has_header(ctx: ctx, header_name: string): boolean {
    if (header_name === '') {
        return false
    }
    if (hdr_type_name.has(header_name)) {
        const name = hdr_type_name.get(header_name)!
        return ctx.hm.has(name)
    }

    if (ctx.hm.has(hdr.other)) {
        for (const header of ctx.hm.get(hdr.other)!) {
            if (header_name === header.name) {
                return true
            }
        }
    }

    return false
}

export function get_header_enum(header_name: string): hdr {
    return hdr_type_name.get(header_name) ?? hdr.other
}

export function shift_header(ctx: ctx, header_name: string): boolean {
    if (header_name === '') {
        return false
    }

    const name = get_header_enum(header_name)

    if (!ctx.hm.has(name)) {
        return false
    }

    const header = ctx.hm.get(name)!

    if (name === hdr.other) {
        for (let i = 0; i < header.length; ++i) {
            if (header[i].name === header_name) {
                ctx.hm.set(name, [
                    ...header.slice(0, i),
                    ...header.slice(i + 1),
                ])
                return true
            }
        }
        return false
    }

    header!.shift()

    return true
}

// 从头部列表中一个头部，并返回是否成功
export function unshift_header(
    ctx: ctx,
    header_name: string,
    header_value: string
): boolean {
    if (header_name === '' || header_value === '') {
        return false
    }

    const name = get_header_enum(header_name)

    if (ctx.hm.has(name)) {
        ctx.hm.get(name)!.unshift({
            name: header_name,
            parsed_s: header_name + header_split + header_value,
        })
        return true
    }

    ctx.hm.set(name, [
        {
            name: header_name,
            parsed_s: header_name + header_split + header_value,
        },
    ])

    return true
}

export function push_header(
    ctx: ctx,
    header_name: string,
    header_value: string
): boolean {
    if (header_name === '' || header_value === '') {
        return false
    }

    const name = get_header_enum(header_name)

    if (ctx.hm.has(name)) {
        ctx.hm.get(name)!.push({
            name: header_name,
            parsed_s: header_name + header_split + header_value,
        })
        return true
    }

    ctx.hm.set(name, [
        {
            name: header_name,
            parsed_s: header_name + header_split + header_value,
        },
    ])

    return true
}

export function get_header_count(ctx: ctx, header_name: string): number {
    if (header_name === '') {
        return 0
    }

    const name = get_header_enum(header_name)

    if (!ctx.hm.has(name)) {
        return 0
    }

    if (name !== hdr.other) {
        return ctx.hm.get(name)?.length ?? 0
    }

    const hs = ctx.hm.get(hdr.other)

    let i = 0
    for (const h of hs!) {
        if (h.name === header_name) {
            i++
        }
    }

    return i
}

export function is_method() {}
