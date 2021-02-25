//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firstbody = document.querySelectorAll(".card-body")[0];
const secondbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButon = document.querySelector("#clear-todos");

//Tüm eventler listenerler

eventListeners();
function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondbody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",fiterTodos);
    clearButon.addEventListener("click",ClearAllTodos);



}

function ClearAllTodos(e){
if(confirm("Tümünü Silmek İstediğinize Emin Misiniz??")){
    //todolist.innerHTML="";

    while(todolist.firstElementChild != null)
todolist.removeChild(todolist.firstElementChild);
}
localStorage.removeItem("todos");






}

///Filtreleme işlemi
function fiterTodos(e){
   // console.log(e.target.value);
    const filtervalue=e.target.value.toLowerCase();
    const listitemssx=document.querySelectorAll(".list-group-item");

    listitemssx.forEach(function(listitem){
        const text=listitem.textContent.toLowerCase();
        if(text.indexOf(filtervalue)=== -1){
            listitem.setAttribute("style","display: none !important")
        }
        else{
            listitem.setAttribute("style","display: block")
        }


    });




}

//silme işlemi
function deleteTodo(e){


    if(e.target.className==="fa fa-remove"){
       e.target.parentElement.parentElement.remove();
       deletetodofrom(e.target.parentElement.parentElement.textContent);
       showAlert("success","Başarılı ile silindi");
    }

}
function deletetodofrom(deleteTodo){
let todos=getTodosFromStorage();
todos.forEach(function(todo,index){
if(todo===deleteTodo){
    todos.splice(index,1);
}

});
localStorage.setItem("todos",JSON.stringify(todos));

}
function loadAllTodosToUI(){

    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e) {

    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
        showAlert("danger", "Lütfen bir todo girin..");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Başarılı Bir Şekilde Eklendi..");
    }

 



    e.preventDefault();
}
function getTodosFromStorage(){
let todos;
if(localStorage.getItem("todos")==null){
    todos=[];
}
else{
    todos=JSON.parse(localStorage.getItem("todos"));
}
return todos;

}
//Local storageye ekleme

function addTodoToStorage(newTodo){
let todos=getTodosFromStorage();
todos.push(newTodo);

localStorage.setItem("todos",JSON.stringify(todos));
}

//Todo girilmez ise verilecek mesaj 
function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstbody.appendChild(alert);
// danger ne kadar ekranda kalacak
    setTimeout(function () {
        alert.remove();
    }, 1000);

}

function addTodoToUI(newTodo) {//string değerini list item olarak Uı ya ekle

    //lİST İTEM OLUŞTURMA

    const listitem = document.createElement("li");

    //LİNK OLUŞTURMA
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = " <i class = 'fa fa-remove'></i>";

    listitem.className = "list-group-item d-flex justify-content-between";

    listitem.appendChild(document.createTextNode(newTodo));
    listitem.appendChild(link);


    todolist.appendChild(listitem);
    todoInput.value = "";








}