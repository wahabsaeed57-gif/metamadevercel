import app from "../src/app.js";
import connectDb from "../src/db/db.js";

let connectPromise;
function ensureDb() {
  if (!connectPromise) {
    connectPromise = connectDb();
  }
  return connectPromise;
}

export default async function handler(req, res) {
  await ensureDb();
  return app(req, res);
}
