"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
var Note = /** @class */ (function () {
    function Note() {
        this.datePublished = new Date();
    }
    Object.defineProperty(Note.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    return Note;
}());
exports.Note = Note;
