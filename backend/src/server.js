import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(`${env.APP_NAME} listening on port ${env.PORT}`);
});
