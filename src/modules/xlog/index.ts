import pino from 'pino'

const logger = pino({
    timestamp: pino.stdTimeFunctions.isoTime,
    base: undefined,
    formatters: {
        level(label) {
            return { level: label }
        },
    },
})

export function set_logger_level(level: string) {
    logger.level = level
}

export function get_logger(lable: string = 'defalut') {
    return logger.child({ lable })
}
