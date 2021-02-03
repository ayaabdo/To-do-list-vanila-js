var todos = document.getElementById("toDoList");
var input = document.getElementById("todo");
var addButton = document.getElementById("add");
var completed = document.getElementById("completed");
var flagCom = false,flagTo = false;
var ids = localStorage.length;
addButton.addEventListener("click",function(e){
    e.preventDefault();
    ids++;
    if(input.value){
        addNewTask(ids);
        storeIntoLocalStorage(ids);
        input.value = "";
    }
});

function storeIntoLocalStorage(id)
{
    //localStorage.setItem(`todos${id}`,todos.innerHTML);
    localStorage.setItem("todos",todos.innerHTML);
}

function getValuesFromLocalStorag()
{
    //for(let i = 0;i < localStorage.length;++i){
        let storedVal = localStorage.getItem("todos");
        if(!storedVal && !flagTo) 
        {
            todos.innerHTML = "";
        }
        else{
            todos.innerHTML = storedVal;
            flagTo = true;
        }
        let comVal = localStorage.getItem("completed");
        if(!comVal && !flagCom)
        {
            completed.innerHTML = "";
        }
        else{
            completed.innerHTML = comVal;
            flagCom = true;
        }
   // }
}
getValuesFromLocalStorag();

function addNewTask(id)
{
        //console.log("id "+id);
        let li = document.createElement("li");
        li.setAttribute("id",`${id}`);
        li.setAttribute("class","todos")

        let checkBox = document.createElement('input');
        checkBox.setAttribute("class","checkbox");
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("id",`check${id}`);
        checkBox.setAttribute("name","check");

        let labelCheckBox = document.createElement('label');
        labelCheckBox.setAttribute("for",`check${id}`);


        let deleteButton = document.createElement('input');
        deleteButton.setAttribute("class","del");
        deleteButton.setAttribute("type","submit");
        deleteButton.setAttribute("value"," ");

        deleteButton.addEventListener("click",function(e){
                removeTask(li.id);
        });
        //deleteButton.onclick = removeTask;
        
        let text = document.createElement('span');
        text.innerHTML = `${input.value}`;
        text.setAttribute("class","task");
        text.setAttribute("id",`span${id}`);

        checkBox.addEventListener('change', function(e) {
            if(checkBox.checked)
            {
                moveToCompleted(li.id);
                checkBox.onclick = moveToCompleted;
            }
            else{
                moveToDo(li.id);
               //checkBox.onclick = moveToDo;
            }
        });
        
        li.appendChild(checkBox);
        li.appendChild(labelCheckBox);
        li.appendChild(deleteButton);
        li.appendChild(text);
        todos.appendChild(li);
}
function removeTask(id)
{
     let li = document.getElementById(`${id}`);
     if(li.className === "todos"){
         document.getElementById("toDoList").removeChild(li);
         localStorage.removeItem("todos");
         localStorage.setItem("todos",todos.innerHTML);
     }
     else{
         document.getElementById("completed").removeChild(li);
         localStorage.removeItem("completed");
         localStorage.setItem("completed",completed.innerHTML);
     }

}
function moveToDo(id)
{
    let check = document.getElementById(`check${id}`);
    check.setAttribute("checked","false");
    let span = document.getElementById(`span${id}`);
    span.style.textDecoration='none';
    let li = document.getElementById(`${id}`);
    li.setAttribute("class","todos")
    todos.appendChild(li);

    //console.log(todos);
   
    //var data = localStorage.getItem("todos");
    //var arr = data.split(',');
    //arr.splice(id-1,1);
   // localStorage.removeItem("todos");
    localStorage.setItem("todos",todos.innerHTML);

    //var data = localStorage.getItem("completed");
   // var arr = data.split(',');
    //arr.splice(id-1,1);
   // localStorage.removeItem("completed");
    localStorage.setItem("completed",completed.innerHTML);
}
function moveToCompleted(id)
{
    let check = document.getElementById(`check${id}`);
    check.setAttribute("checked","true");
    let span = document.getElementById(`span${id}`);
    span.style.textDecoration='line-through';
    let li = document.getElementById(`${id}`);
    li.setAttribute("class","completed")
    completed.appendChild(li);

    localStorage.setItem("completed",completed.innerHTML);
    localStorage.setItem("todos",todos.innerHTML);
}
