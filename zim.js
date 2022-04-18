const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
const closeIcon = popupBox.querySelector("header i");
const input = popupBox.querySelector("input");
const textarea = popupBox.querySelector("textarea");
const button = popupBox.querySelector("button");
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,updateId;
addBox.addEventListener("click",() => {
    popupTitle.innerText = "Add a new Note";
    button.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) input.focus();
});
closeIcon.addEventListener("click",() => {
    isUpdate = false;
    input.value = textarea.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});
function showNotes(){
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
    notes.forEach((note,id) => {
        let filterDescription = note.description.replaceAll("\n",'<br/>');
        let listTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDescription}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id},'${note.title}','${filterDescription}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend",listTag);
    });
}
showNotes();
function showMenu(element){
    element.parentElement.classList.add("show");
    document.addEventListener("click",event => {
        if(event.target.tagName != "I" || event.target != element){
            element.parentElement.classList.remove("show");
        }
    });
}
function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes();
}
function updateNote(noteId,title,filterDescription){
    let description = filterDescription.replaceAll('<br/>','\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    input.value = title;
    textarea.value = description;
    popupTitle.innerText = "Update a Note";
    button.innerText = "Update Note";
}
button.addEventListener("click",event => {
    event.preventDefault();
    let title = input.value.trim(),
    description = textarea.value.trim();
    if(title || description) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();
        let noteInfo = {title,description,date: `${month} ${day},${year}`}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes",JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
});