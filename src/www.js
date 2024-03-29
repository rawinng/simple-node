#!/usr/bin/env node
import "core-js/stable";
import "regenerator-runtime/runtime";

import http from "http";
import app from "./app";

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    switch (error.code) {
        case "EACCES":
            console.error(`${port} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind =
        typeof port === "string" ? `Pipe ${port}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
};

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
