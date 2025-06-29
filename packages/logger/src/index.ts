/// <reference types="node" />
import pino from 'pino'

const transportOpts = process.env.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined

export const logger = pino({
    level: process.env['LOG_LEVEL'] ?? 'info',
    ...(transportOpts ? { transport: transportOpts } : {}),
    formatters: {
        level: (label: string) => {
            return { level: label };
        },
    },
})