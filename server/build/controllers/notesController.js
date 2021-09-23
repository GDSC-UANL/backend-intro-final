"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = void 0;
var express_1 = require("express");
exports.notesRouter = (0, express_1.Router)();
var notes = [];
exports.notesRouter.get("/api/notes", function (req, res) {
    res.json(notes);
});
exports.notesRouter.post("/api/notes", function (req, res) {
    var message = req.body.message;
    notes.push(message);
    res.send("Exito");
});
