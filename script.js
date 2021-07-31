const add = document.getElementById('add');
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
     notes.forEach((note) => {
          addNewNote(note);
     });
}
add.addEventListener('click',() => {
     addNewNote();
});
function addNewNote(text = ""){
     const div = document.createElement('div');
     div.classList.add('note');
     div.innerHTML = `
          <div class="notes">
               <div class="tools">
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash-alt"></i></button>
               </div>
               <div class="main ${text ? "" : "hidden"}"></div>
               <textarea class="${text ? "hidden" : ""}"></textarea>
          </div>
     `;
     const edit = div.querySelector('.edit');
     const deleted = div.querySelector('.delete');
     const main = div.querySelector('.main');
     const textarea = div.querySelector('textarea');
     textarea.value = text;
     main.innerHTML = marked(text);
     edit.addEventListener('click',() => {
          main.classList.toggle('hidden');
          textarea.classList.toggle('hidden');
     });
     deleted.addEventListener('click',() => {
          div.remove();
          updateLS();
     });
     textarea.addEventListener('input',(event) => {
          const {value} = event.target;
          main.innerHTML = marked(value);
          updateLS();
     });
     document.body.appendChild(div);
}
function updateLS(){
     const textarea = document.querySelectorAll('textarea');
     const notes = [];
     textarea.forEach((note) => {
          notes.push(note.value);
     });
     localStorage.setItem('notes',JSON.stringify(notes));
}