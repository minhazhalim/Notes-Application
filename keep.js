const add = document.querySelector('#add');
const updateLSData = () => {
     const textarea = document.querySelectorAll('textarea');
     const notes = [];
     textarea.forEach((note) => {
          return notes.push(note.value);
     });
     localStorage.setItem('Notes',JSON.stringify(notes));
};
const addNewNote = (text = "") => {
     const div = document.createElement('div');
     div.classList.add('note');
     const HTMLData = `
          <div class="operation">
               <button class="edit"><i class="fas fa-edit"></i></button>
               <button class="delete"><i class="fas fa-trash-alt"></i></button>
          </div>
          <div class="main ${text ? "" : 'hidden'}"></div>
          <textarea class="${text ? 'hidden' : ""}"></textarea>
     `;
     div.insertAdjacentHTML('afterbegin',HTMLData);
     const edit = div.querySelector(".edit");
     const deleting = div.querySelector(".delete");
     const main = div.querySelector(".main");
     const textarea = div.querySelector("textarea");
     deleting.addEventListener("click",() => {
          div.remove();
          updateLSData();
     });
     textarea.value = text;
     main.innerHTML = text;
     edit.addEventListener('click',() => {
          main.classList.toggle('hidden');
          textarea.classList.toggle('hidden');
     });
     textarea.addEventListener('change',(event) => {
          const value = event.target.value;
          main.innerHTML = value;
          updateLSData();
     });
     document.body.appendChild(div);
};
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
     notes.forEach((note) => addNewNote(note));
}
add.addEventListener('click',() => addNewNote());