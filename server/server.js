import express, { json } from "express";
import cors from "cors";
import { init } from "./repository.js";
import routes from "./routes.mjs";

const application = express();
application.use(cors({ origin: true }));
application.use(json());
application.use("/api", routes);

application.listen(8088, async () => {
  try {
    await init();
    console.log("listening on 8088");
  } catch (error) {
    console.error(error);
  }
});
