import { createLogger, format, transports } from "winston";
import path from "path";

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            filename: path.join(__dirname, "logs", "email-log.log"),
            level: "info",
        }),
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
    ],
});

export default logger;
