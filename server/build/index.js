"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var notesController_1 = require("./notesController");
var database_1 = require("./database");
var app = (0, express_1.default)();
function start() {
    app.listen(5000, function () {
        console.log("Server iniciado en puerto 5000");
    });
}
function config() {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/api/notes", notesController_1.notesRouter);
}
start();
config();
(0, database_1.connectDatabase)();
