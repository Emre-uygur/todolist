const form = document.querySelector("#todo-form"); 
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){

    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
    //arayüzden todoları temizleme
        todoList.innerHTML = "";
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue) === -1){
            // bulamadı
            listItem.setAttribute("style","display : none !important");
        }

        else{
            listItem.setAttribute("style","display : block");
        }

    })


}
function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFormStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi...");
    }

}

function deleteTodoFormStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); // arraydan değeri sildirme
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(element => {
        addTodoToUI(element);
    });
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger", "Lütfen bir todo girin...");
    } else {
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert( "success"," Todo başariyla eklendi...")
    }

    e.preventDefault();
    
}
function getTodosFromStorage(){  // storage dan bütün todoları alma
    let todos;
        if(localStorage.getItem("todos")=== null){
            todos = [];
        }
        else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        return todos;
}
function addTodoStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}   

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000);
}

function addTodoToUI(newTodo) {
    const listitem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#"; 
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    listitem.className = "list-group-item d-flex justify-content-between";

    listitem.appendChild(document.createTextNode(newTodo));
    listitem.appendChild(link);

    todoList.appendChild(listitem);
    todoInput.value = "";
}
