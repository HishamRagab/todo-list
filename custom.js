let inp = document.querySelector("input");
let sub = document.querySelector(".add-item");
let list = document.querySelector(".list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

for (let i = 0; i < tasks.length; i++) {
  add(true, tasks[i].id, tasks[i].name, tasks[i].isCompleted);
}

sub.addEventListener("click", function () {
  add(false, new Date().getTime(), inp.value, false);
});
inp.addEventListener("keypress", function (event) {
  if (event.key === "Enter") add(false, new Date().getTime(), inp.value, false);
});

document.addEventListener("click", (ele) => {
  if (ele.target.tagName === "I") {
    let item = ele.target.parentElement.parentElement.parentElement;
    let button = ele.target.parentElement;
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (button.classList.contains("delete")) {
      item.remove();
      tasks = tasks.filter((o) => o.id != item.id);
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
    } else if (button.classList.contains("check-box")) {
      let task = tasks.filter((o) => o.id == item.id)[0];
      if (item.classList.contains("done")) {
        ele.target.textContent = "check_box_outline_blank";
        item.classList.remove("done");
        task.isCompleted = false;
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
      } else {
        ele.target.textContent = "check_box";
        item.classList.add("done");
        task.isCompleted = true;
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
  }
});

function add(isMainItem, id, name, isCompleted) {
  if (name.trim() !== "") {
    let item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `<div class="content">${name}</div>
                      <div class="setting">
                        <button class="check-box"><i aria-hidden="true" class="material-icons">check_box_outline_blank</i></button>
                        <button class="delete"><i aria-hidden="true" class="material-icons">delete</i></button>
                      </div>`;
    if (isCompleted === true) {
      item.classList.add("done");
      item.children[1].firstElementChild.firstElementChild.textContent =
        "check_box";
    }
    list.appendChild(item);
    if (isMainItem === false) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      let task = {
        id: id,
        name: name,
        isCompleted: isCompleted,
      };
      tasks.push(task);
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    item.id = id;
  }
  inp.value = "";
}
