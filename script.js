const timebox = document.getElementById("timer");
const timeYear = document.getElementById("timeYear");
const formMain = document.getElementById("form-create");
const formEdit = document.getElementById("formEdit");
const titleText = document.getElementById("inn");
const ulList = document.getElementById("list");
const inputError = document.getElementById("inputError");
// FUNCTIONS  getday
const modalBox = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");
const clearBtn = document.getElementById("clear");

let fullTime = "";
let fullDay = "";
const getTimeLog = () => {
  let data = new Date();
  let day = data.getDate();
  let month = data.getMonth() + 1;
  let year = data.getFullYear();
  fullDay = `${day}.${month}.${year}`;
  let hour = data.getHours();
  let minute =
    data.getMinutes() < 10 ? `0${data.getMinutes()}` : data.getMinutes();
  let second =
    data.getSeconds() < 10 ? `0${data.getSeconds()}` : data.getSeconds();
  fullTime = `${hour}:${minute}:${second}`;
  timebox.textContent = fullTime;
  timeYear.textContent = fullDay;
};
setInterval(() => {
  getTimeLog();
}, 1000);

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];
console.log(todos);

if (todos.length) {
  getStorage();
}
const sendStorage = (todosArray) => {
  localStorage.setItem("list", JSON.stringify(todosArray));
};
function getStorage() {
  let getBaza = JSON.parse(localStorage.getItem("list"));
  ulList.innerHTML = "";
  getBaza.forEach((item, idx) => {
    ulList.innerHTML += `
     <li class="list-item >
        <h3 class="list-text">${item.title}</h3>
        <div class="list-timebox">
          <p>${item.time}</p>
        </div>
              
        <div class="list-btns">
          <i
           onclick=changeCompleted(${idx}) 
           class="fa-solid fa-check  ${
             item.completed == true ? "darks" : ""
           }""></i>
          <i onclick=(editModal(${idx})) class="fa-solid fa-pen-to-square" ></i>
          <i onclick=(deleteTodo(${idx})) class="btn-delete fa-solid fa-trash"></i>
        </div>
      </li>
    `;
  });
}
formMain.addEventListener("submit", (e) => {
  e.preventDefault();
  let todoText = titleText.value.trim();
  let todoTime = fullTime.slice(0, 5) + " " + fullDay;
  if (todoText.length) {
    todos.push({ title: todoText, time: todoTime, completed: false });
    sendStorage(todos);
    getStorage();
    formMain.reset();
  } else {
    inputError.textContent = "iltimos katakni toldiring";
    setTimeout(() => {
      inputError.textContent = "";
    }, 1500);
  }
});

function deleteTodo(arNumber) {
  let deleteTodo = todos.filter((item, idx) => {
    return arNumber != idx;
  });
  todos = deleteTodo;
  sendStorage(todos);
  getStorage(todos);
}
function changeCompleted(id) {
  let changedTodo = todos.map((item, idx) => {
    if (idx == id) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });

  todos = changedTodo;
  sendStorage(todos);
  getStorage();
}

function openModal() {
  modalBox.classList.add("show");
}
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modalBox.classList.remove("show");
}
function editModal(id) {
  openModal();
  const editTodo = todos[id];
  formEdit["editInput"].value = editTodo.title;
  formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    let editText = formEdit["editInput"].value.trim();
    let todoTime = fullTime.slice(0, 5) + " " + fullDay;
    if (editText.length) {
      console.log(editText);

      todos.splice(id, 1, {
        title: editText,
        time: todoTime,
        completed: false,
      });
      sendStorage(todos);
      getStorage();
      formMain.reset();
      closeModal();
    } else {
      document.getElementById("errorEdit").textContent =
        "iltimos katakni toldiring";
      setTimeout(() => {
        document.getElementById("errorEdit").textContent = "";
      }, 1500);
    }
  });
}
document.addEventListener("keydown", (e) => {
  if (e.which === 27) {
    closeModal;
  }
});
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("list");
  todos = [];
  ulList.innerHTML = "";
});
