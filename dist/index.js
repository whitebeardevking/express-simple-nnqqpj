"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const app = (0, server_1.createServer)();
const port = 3100;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map