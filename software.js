const application = document.getElementById('application');
const addNote = application.querySelector('.addNote');
getNotes().forEach((note) => {
     const noteElement = createNoteElement(note.id,note.content);
     application.insertBefore(noteElement,addNote);
});
addNote.addEventListener('click',() => {
     addNotes();
});
function getNotes(){
     return JSON.parse(localStorage.getItem('stickyNotes-note') || '[]');
}
function saveNotes(notes){
     localStorage.setItem('stickyNotes-note',JSON.stringify(notes));
}
function createNoteElement(id,content){
     const textarea = document.createElement('textarea');
     textarea.classList.add('note');
     textarea.value = content;
     textarea.placeholder = 'empty sticky note';
     textarea.addEventListener('change',() => {
          updateNote(id,element.value);
     });
     textarea.addEventListener('dblclick',() => {
          const doDelete = confirm('are you sure you wish to delete this sticky note ?');
          if(doDelete){
               deleteNote(id,textarea);
          }
     });
     return textarea;
}
function addNotes(){
     const notes = getNotes();
     const noteObject = {
          id: Math.floor(Math.random() * 100000),
          content: '',
     };
     const noteElement = createNoteElement(noteObject.id,noteObject.content);
     application.insertBefore(noteElement,addNote);
     notes.push(noteObject);
     saveNotes(notes);
}
function updateNote(id,newItem){
     const notes = getNotes();
     const targetNote = notes.filter((note) => note.id == id)[0];
     targetNote.content = newItem;
     saveNotes(notes);
}
function deleteNote(id,element){
     const notes = getNotes().filter((note) => note.id != id);
     application.removeChild(element);
     saveNotes(notes);
}