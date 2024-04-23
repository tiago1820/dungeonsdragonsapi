import { server } from "./app.js";
import { conn } from "./db.js";

const PORT = 3001;
server.listen(PORT, async () => {
    await conn.sync({ alter: true });
    console.log(`Listening on port ${PORT}`)
});