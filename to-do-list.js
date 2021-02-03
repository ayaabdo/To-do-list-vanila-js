var todos = document.getElementById("toDoList");
var input = document.getElementById("todo");
var addButton = document.getElementById("add");
var completed = document.getElementById("completed");
var flagCom = false,flagTo = false;
var ids = localStorage.length;

addButton.addEventListener("click",function(e){
   // e.preventDefault();
    ids++;
    if(input.value){
        addNewTask(ids);
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
    let storedVal = localStorage.getItem("todos");
    if(!storedVal) 
    {
        todos.innerHTML = "";
    }
    else{
        todos.innerHTML = storedVal;
    }
    let comVal = localStorage.getItem("completed");
    if(!comVal)
    {
        completed.innerHTML = "";
    }
    else{
        completed.innerHTML = comVal;
    }
}


function addNewTask(id)
{
        var li = document.createElement("li");
        li.setAttribute("id",`${id}`);
        li.setAttribute("class","todos")

        var checkBox = document.createElement('input');
        checkBox.setAttribute("class","checkbox");
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("id",`check${id}`);
        checkBox.setAttribute("name","check");

        var labelCheckBox = document.createElement('label');
        labelCheckBox.setAttribute("for",`check${id}`);


        var deleteButton = document.createElement('input');
        deleteButton.setAttribute("class","del");
        deleteButton.setAttribute("type","submit");
        deleteButton.setAttribute("value"," ");

       deleteButton.onclick = removeTask;
        
       var text = document.createElement('span');
        text.innerHTML = `${input.value}`;
        text.setAttribute("class","task");
        text.setAttribute("id",`span${id}`);

        checkBox.onclick = changeStatus;

        li.appendChild(checkBox);
        li.appendChild(labelCheckBox);
        li.appendChild(deleteButton);
        li.appendChild(text);
        todos.appendChild(li);
        localStorage.removeItem("todos");
        localStorage.setItem("todos",todos.innerHTML);
}

function removeTask()
{
    var listItem=this.parentNode;
    console.log(listItem);
    var ul=listItem.parentNode;
    ul.removeChild(listItem);

     if(listItem.className === "todos"){
         localStorage.removeItem("todos");
         localStorage.setItem("todos",todos.innerHTML);
     }
     else{
         localStorage.removeItem("completed");
         localStorage.setItem("completed",completed.innerHTML);
     }

}
function changeStatus()
{
    var listItem=this.parentNode;
    console.log(listItem.getAttribute('id') );
    var ul=listItem.parentNode;
    //ul.removeChild(listItem);

    if(ul.getAttribute('id') === "toDoList"){
        var check = document.getElementById(`check${listItem.getAttribute('id')}`);
        check.setAttribute("checked","true");
        var span = document.getElementById(`span${listItem.getAttribute('id')}`);
        span.style.textDecoration='line-through';
        var li = document.getElementById(`${listItem.getAttribute('id')}`);
        li.setAttribute("class","completed")
        completed.appendChild(li);
    }
    else{
        var check = document.getElementById(`check${listItem.getAttribute('id')}`);
        check.setAttribute("checked","false");
        console.log(listItem.getAttribute('id') );
        var span = document.getElementById(`span${listItem.getAttribute('id')}`);
        span.style.textDecoration='none';
        var li = document.getElementById(`${listItem.getAttribute('id')}`);
        li.setAttribute("class","todos")
        todos.appendChild(li);
    }
    localStorage.setItem("todos",todos.innerHTML);
    localStorage.setItem("completed",completed.innerHTML);
}

getValuesFromLocalStorag();