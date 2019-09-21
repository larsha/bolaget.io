import { createLogger, format, transports } from 'winston'

export default createLogger({
  format: format.combine(
    format.prettyPrint(),
    format.colorize(),
    format.simple()
  ),
  transports: [new transports.Console()]
})
