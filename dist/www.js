#!/usr/bin/env node
"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

var port = normalizePort(process.env.PORT || "3000");

_app["default"].set("port", port);

var server = _http["default"].createServer(_app["default"]);

var onError = function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error("".concat(port, " requires elevated privileges"));
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error("".concat(port, " is already in use"));
      process.exit(1);
      break;

    default:
      throw error;
  }
};

var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof port === "string" ? "Pipe ".concat(port) : "port ".concat(addr.port);
  console.log("Listening on ".concat(bind));
};

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);