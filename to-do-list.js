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
    localStorage.setItem(`todos${id}`,todos.innerHTML);
}

function getValuesFromLocalStorag()
{
    for(let i = 0;i < localStorage.length;++i){
        let storedVal = localStorage.getItem(`todos${i}`);
        if(!storedVal && !flagTo) 
        {
            todos.innerHTML = "";
        }
        else{
            todos.innerHTML = storedVal;
            flagTo = true;
        }
        let comVal = localStorage.getItem(`completed${i}`);
        if(!comVal && !flagCom)
        {
            completed.innerHTML = "";
        }
        else{
            completed.innerHTML = comVal;
            flagCom = true;
        }
    }
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
            let result = confirm("Are you sure you want to delete this contact ?");
            if (result) {            
                removeTask(li.id);
               // window.deferredPrompt = Object.assign(e);
            }
        });
        let text = document.createElement('span');
        text.innerHTML = `${input.value}`;
        text.setAttribute("class","task");
        text.setAttribute("id",`span${id}`);

        checkBox.addEventListener('change', function(e) {
            if(checkBox.checked)
            {
                moveToCompleted(li.id);
            }
            else{
                moveToDo(li.id);
            }
            //window.deferredPrompt = Object.assign(e);
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
        localStorage.removeItem(`todos${id}`);
    }
    else{
        document.getElementById("completed").removeChild(li);
        localStorage.removeItem(`completed${id}`);
    }

}
function moveToDo(id)
{
    console.log(todos);
    let span = document.getElementById(`span${id}`);
    span.style.textDecoration='none';
    let li = document.getElementById(`${id}`);
    li.setAttribute("class","todos")
    todos.appendChild(li);
    localStorage.removeItem(`todos${id}`);
    localStorage.setItem(`todos${id}`,todos.innerHTML);

    localStorage.removeItem(`completed${id}`);
    localStorage.setItem(`completed${id}`,completed.innerHTML);
}
function moveToCompleted(id)
{
    let span = document.getElementById(`span${id}`);
    span.style.textDecoration='line-through';
    let li = document.getElementById(`${id}`);
    li.setAttribute("class","completed")
    completed.appendChild(li);
    localStorage.removeItem(`completed${id}`);
    localStorage.setItem(`completed${id}`,completed.innerHTML);

    localStorage.removeItem(`todos${id}`);
    localStorage.setItem(`todos${id}`,todos.innerHTML);
}
