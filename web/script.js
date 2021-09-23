const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesContainer = document.getElementById("notes");

async function getNotes() {
  let response = await fetch("http://localhost:5000/api/notes");
  let notes = await response.json();

  notesContainer.innerHTML = ""

  for (let i = 0; i < notes.length; i++) {
    addNoteToHTML(notes[i]);
  }
}

getNotes();

async function addNote() {
  let title = titleInput.value;
  let content = contentInput.value;

  let headers = new Headers();

  headers.append("Content-Type", "application/json");

  await fetch("http://localhost:5000/api/notes", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ title, content }),
  });

  getNotes();
}

async function deleteNote(id) {
  await fetch("http://localhost:5000/api/notes/" + id, {
    method: "DELETE",
  });

  getNotes();
}

async function updateNote(note) {
  let headers = new Headers();

  headers.append("Content-Type", "application/json");

  await fetch("http://localhost:5000/api/notes/"+note._id, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(note),
  });

  getNotes();
}

function addNoteToHTML(note) {
  const cardContainer = document.createElement("div");
  const card = document.createElement("div");
  const cardContent = document.createElement("div");

  cardContainer.classList.add("col", "xl6", "s12", "offset-xl3");
  card.classList.add("card");
  cardContent.classList.add("card-content");

  card.appendChild(cardContent);
  cardContainer.appendChild(card);

  const title = document.createElement("span");
  const date = document.createElement("p");
  const formattedDate = new Date(note.datePublished);
  const content = document.createElement("span");
  const cardActions = document.createElement("div");
  const deleteBtn = document.createElement("a");
  const updateBtn = document.createElement("a");

  cardActions.classList.add("card-action");
  title.classList.add("card-title");
  title.innerHTML = note.title;
  content.innerHTML = note.content;
  date.innerHTML = "<br>Creado el " + formattedDate.toLocaleDateString("es-MX");
  content.contentEditable = true;
  title.contentEditable = true;

  title.addEventListener("input", (val) => {
    note.title = val.target.innerHTML;
  });
  content.addEventListener("input", (val) => {
    note.content = val.target.innerHTML;
  });

  deleteBtn.innerHTML = "ELIMINAR NOTA";
  deleteBtn.classList.add("indigo-text");
  deleteBtn.href = "#";
  deleteBtn.onclick = () => deleteNote(note._id);

  updateBtn.innerHTML = "ACTUALIZAR NOTA";
  updateBtn.classList.add("indigo-text");
  updateBtn.href = "#";
  updateBtn.onclick = () => updateNote(note);

  cardActions.appendChild(deleteBtn);
  cardActions.appendChild(updateBtn);

  cardContent.appendChild(title);
  cardContent.appendChild(content);
  cardContent.appendChild(date);
  card.appendChild(cardActions);

  notesContainer.appendChild(cardContainer);
}
