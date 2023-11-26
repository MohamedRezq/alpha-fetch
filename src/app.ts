import express from "express";
import bodyParser from "body-parser";
import { logRequests } from "./middleware/logging.middleware";
import { rateLimiter } from "./middleware/rate-limit.middleware";
// import { authMiddleware } from "./middleware/authentication.middleware";
import routes from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(logRequests);
app.use(rateLimiter);
// app.use(authenticate);

app.use(express.json());
app.use(routes);

export default app;
