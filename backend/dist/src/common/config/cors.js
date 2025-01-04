"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowlist = ["http://localhost:3000", "http://localhost:8000", "http://localhost:4000"];
exports.corsOptions = {
    origin: function (origin, callback) {
        if (allowlist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    exposedHeaders: ["WWW-Authenticate"],
};
//# sourceMappingURL=cors.js.map