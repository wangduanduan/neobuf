import { hdr } from "../../core/parser/header"
import { type header_map, hdr_type_name } from "../../core/parser/header"

interface ctx {
    hm: header_map
}

export function format_header(name: string): string {
    if (name === '') {
        return ""
    }

    if (name.endsWith(': ')) {
        return name
    }

    return name + ': '
}

export function has_totag(ctx: ctx): boolean {
    return false
}

export function remove_header(ctx: ctx, header_name: hdr): void {
}

export function has_header(ctx: ctx, header_name: string): boolean {
    if (header_name === '') {
        return false
    }

    header_name = format_header(header_name)


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

export function unshift_header(ctx: ctx, header_name: string, header_value: string): boolean {
    if (header_name === '' || header_value === '') {
        return false
    }

    header_name = format_header(header_name)

    const name = hdr_type_name.get(header_name) ?? hdr.other

    if (ctx.hm.has(name)) {
        ctx.hm.get(name)!.unshift({
            name: header_name,
            parsed_s: header_name + header_value,
        })
        return true
    }


    ctx.hm.set(name, [{
        name: header_name,
        parsed_s: header_name + header_value,
    }])

    return true

}

export function push_header(ctx: ctx, header_name: hdr, header_value: string): void {
}

export function pop_header(ctx: ctx, header_name: hdr): string {
    return ""
}

export function is_method() {

}