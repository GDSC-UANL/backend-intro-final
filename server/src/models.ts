export class Note {
    private _id?: string

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value
    }

    title?: string
    content?: string
    datePublished = new Date()
}