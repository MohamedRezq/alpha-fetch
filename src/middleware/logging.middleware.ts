import logger from "../config/logger";
import morgan from "morgan";

export const logRequests = morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});
