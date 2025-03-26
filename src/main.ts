import { core_params } from './core_params'
import { get_logger } from './modules/xlog'
import { type udp } from 'bun'
import { set_logger_level } from './modules/xlog'
const logger = get_logger('core')

export class OpenSIPS {
    servers: udp.Socket<'buffer'>[] = []
    constructor() {
        logger.info('OpenSIPS init')
    }
    set_core_parameters(key: string, value: string) {
        logger.info('set core param: %s = %s', key, value)
        switch (key) {
            case 'socket':
                this.set_core_socket(value)
                break
            case 'log_level':
                set_logger_level(value)
                break

            default:
                throw new Error('not support core_params: ' + key)
        }
    }
    async set_core_socket(value: string) {
        const meta = value.split(':')
        logger.info('start listening on %s:%s', meta[1], meta[2])
        const server = await Bun.udpSocket({
            port: parseInt(meta[2]),
            hostname: meta[1],
            socket: {
                data(socket, buf, port, addr) {
                    console.log(`message from ${addr}:${port}:`)
                    console.log(buf.toString())
                },
            },
        })
        logger.info('listening on %s:%s success', meta[1], meta[2])
        this.servers.push(server)
    }

    on(event: string, callback: Function) {}
}
