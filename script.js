let newTodo = document.getElementById("newTodo");
let addNewTodo = document.getElementById("addNewTodo");
let allTodos = document.getElementById("allTodos");
const completedTasks = document.getElementById("done-todos");
const totalTasks = document.getElementById("all-todos");
const remainingTasks = document.getElementById("pending-todos");
const todos = [];

addNewTodo.addEventListener("click", () => {
    if (newTodo.value === "") {
        alert('Input field is empty');
        return true;
    }
    addTodo(newTodo.value, "pending")
    localStorage.setItem("all-todos", JSON.stringify(todos));
    statsUpdate()
})

let existingTodos = JSON.parse(localStorage.getItem("all-todos"));
if (!existingTodos) {
    existingTodos = [];
}

existingTodos.forEach(todo => {
    addTodo(todo.name, todo.status)
});


function addTodo(name, status) {

    let todoName = name;
    let todoDetails = { name: todoName, status: status };

    newDiv = document.createElement("div");
    newDiv.setAttribute("class", "new-div");
    allTodos.appendChild(newDiv);
    newDiv.id = todos.length;
    doneButton = document.createElement("input");
    doneButton.setAttribute("class", "done-button p-2 col-sm")
    doneButton.setAttribute("type", "checkbox")
    newDiv.appendChild(doneButton)
    newLi = document.createElement("li");
    newLi.setAttribute("class", "list-group-item p-2 col-6");
    newLi.innerText = todoName;
    newDiv.appendChild(newLi);
    deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button ml-auto p-2 col-sm");
    deleteButton.innerText = "DELETE";
    newDiv.appendChild(deleteButton);
    statsUpdate()

    todos.push(todoDetails);
    newTodo.value = "";

    doneButton.addEventListener("click", doneTodo)
    if (status === "completed") {
        newDiv.classList.add("completed");
    }
    deleteButton.addEventListener("click", deleteTodo);
    newLi.addEventListener("click", todoEdit);

    statsUpdate()

}

function doneTodo(e) {
    let item = e.target;

    let todoElement = item.parentElement;
    todoElement.classList.toggle("completed");
    let id = todoElement.id;
    let todo = todos[id];

    if (todo.status === "completed") {
        todo.status = "pending";
    } else {
        todo.status = "completed";
    }

    localStorage.setItem("all-todos", JSON.stringify(todos));

    statsUpdate()
}


function deleteTodo(e) {


    let item = e.target;

    let todoElement = item.parentElement;
    let id = todoElement.id;

    todos.splice(id, 1)
    localStorage.setItem("all-todos", JSON.stringify(todos))

    item.parentElement.remove();
    statsUpdate()

    for (let todoId = 0; todoId < todos.length; todoId++) {
        allTodos.getElementsByClassName("new-div")[todoId].id = todoId;

    }
}

newTodo.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        if (newTodo.value === "") {
            alert('Input field is empty');
            return true;
        }
        addTodo(newTodo.value, "pending")
        localStorage.setItem("all-todos", JSON.stringify(todos));

    }
    statsUpdate()
})

function todoEdit(e) {
    let item = e.target.parentElement;
    let itemId = item.id;
    let editInput = document.createElement("input");
    editInput.setAttribute("class", "edit-input col-form-label-sm")
    let currentLi = item.getElementsByClassName("list-group-item")[0];
    let currentDiv = item;
    editInput.value = currentLi.innerHTML;
    currentDiv.insertBefore(editInput, currentDiv.children[1])
    currentLi.style.display = "none"

    editInput.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            currentLi.innerHTML = editInput.value;
            currentLi.style.display = "inline-block";
            editInput.style.display = "none";
            let todo = todos[itemId];
            todo.name = currentLi.innerHTML;
            localStorage.setItem("all-todos", JSON.stringify(todos));

        }
    })
}

function statsUpdate() {
    let completedTodos = todos.filter(todo => {
        return todo.status === "completed";
    });
    let completedTodosLength = completedTodos.length;
    completedTasks.innerHTML = "Completed: " + completedTodosLength;
    let totalTodos = todos.length;
    totalTasks.innerHTML = "Total: " + totalTodos;

    let remainingTodos = totalTodos - completedTodosLength;
    remainingTasks.innerHTML = "Remaining: " + remainingTodos;

}
