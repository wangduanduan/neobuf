import { hdr } from "../../core/parser/header"
import type { header_map } from "../../core/parser/header"

interface ctx {
    hm: header_map
}

export function has_totag(ctx: ctx): boolean {
    return false
}

export function remove_header(ctx: ctx, header_name: hdr): void {
}

export function has_header(ctx: ctx, header_name: hdr): boolean {
    return ctx.hm.has(header_name)
}

export function unshift_header(ctx: ctx, header_name: hdr | string, header_value: string): void {
    // [ ] wip
}

export function push_header(ctx: ctx, header_name: hdr, header_value: string): void {
}

export function pop_header(ctx: ctx, header_name: hdr): string {
    return ""
}

export function is_method() {

}