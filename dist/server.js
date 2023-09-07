"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express = require("express");
const cors = require("cors");
function createServer() {
    const app = express();
    app.use(cors());
    app.get('/', (req, res) => {
        res.send({ greeting: 'Hello' });
    });
    return app;
}
exports.createServer = createServer;
//# sourceMappingURL=server.js.map