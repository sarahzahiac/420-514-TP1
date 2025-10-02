import { createLogger, format, transports} from "winston";
import fs from "fs";
import path from "path";

//------------ ASSURER PRESENCE DE FICHIER LOGS ------------//
const logsDir = path.join(__dirname, "../logs");
if(fs.existsSync(logsDir)){
    fs.mkdirSync(logsDir, {recursive : true});
}

//------------ FORMAT DE LOGGERS ------------//
export const logger = createLogger({
    level : "info",
    format : format.combine(
        format.timestamp({format : "YYYY-MM-DD:mm:ss"}),
        format.errors({stack : true}),
        format.splat(),
        format.json()
    ),
    defaultMeta : {service : "media-api"},
    transports : [
        new transports.File({filename : path.join(logsDir, "error.log"), level : "error"}),
        new transports.File({filename : path.join(logsDir, "app.log"), level : "info"})
    ]
});

//------------ GESTION D'ERREUR ------------//
export const logError = (err: any, method: string, url: string) => {
	logger.error(`ERR ${method} ${url} message=${err.message}`);
};

//------------ GESTION DE QUI À APPELR LA ROUTE, QUAND ET COMMENT ------------//
export const logRequest = (method: string, url: string, userId?: string) => {
	logger.info(`REQ ${method} ${url} user=${userId || "anonymous"}`);
};

export default logger;




