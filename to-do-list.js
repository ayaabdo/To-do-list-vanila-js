var todos = document.getElementById("toDoList");
var input = document.getElementById("todo");
var addButton = document.getElementById("add");
var completed = document.getElementById("completed");
var flagCom = false,flagTo = false;

addButton.addEventListener("click",function(e){
   
    if(input.value){
        addNewTask(input.value);
        input.value = "";
    }
});

function getValuesFromLocalStorag()
{
    let storedVal = localStorage.getItem("todos");
    if(!storedVal) {
        todos.innerHTML = "";

    } else{
        todos.innerHTML = storedVal;
    }

    let comVal = localStorage.getItem("completed");
    if(!comVal){
        completed.innerHTML = "";

    }else{
        completed.innerHTML = comVal;
    }
    //console.log(todos.childNodes[0].id);
    addActions();
}

function addActions()
{
    
    for(let i = 0;i < todos.childNodes.length;++i){
        let deleteButton = document.getElementById(`del${todos.childNodes[i].id}`);
        let checkBox = document.getElementById(`check${todos.childNodes[i].id}`);
        deleteButton.onclick = removeTask;
        checkBox.onclick = changeStatus;
    }
    for(let i = 0;i < completed.childNodes.length;++i){
        let deleteButton = document.getElementById(`del${completed.childNodes[i].id}`);
        let checkBox = document.getElementById(`check${completed.childNodes[i].id}`);
        deleteButton.onclick = removeTask;
        checkBox.onclick = changeStatus;
    }
}

function addNewTask(id)
{
        var li = document.createElement("li");
        li.setAttribute("id",`${id}`);
        li.setAttribute("class","todos")

        var checkBox = document.createElement('input');
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("id",`check${id}`);

        var labelCheckBox = document.createElement('label');
        labelCheckBox.setAttribute("for",`check${id}`);


        var deleteButton = document.createElement('input');
        deleteButton.setAttribute("type","submit");
        deleteButton.setAttribute("value"," ");
        deleteButton.setAttribute("id",`del${id}`);

       deleteButton.onclick = removeTask;
        
       var text = document.createElement('span');
        text.innerHTML = `${input.value}`;
        text.setAttribute("id",`span${id}`);

        checkBox.onclick = changeStatus;

        li.appendChild(checkBox);
        li.appendChild(labelCheckBox);
        li.appendChild(deleteButton);
        li.appendChild(text);
        todos.appendChild(li);

        localStorage.setItem("todos",todos.innerHTML);
}

function removeTask()
{
    var listItem=this.parentNode;
    console.log(listItem);
    var ul=listItem.parentNode;
    ul.removeChild(listItem);

     if(listItem.className === "todos"){
         localStorage.setItem("todos",todos.innerHTML);
     }
     else{
         localStorage.setItem("completed",completed.innerHTML);
     }

}
function changeStatus()
{
    var listItem=this.parentNode;
    console.log(listItem.getAttribute('id') );
    var ul=listItem.parentNode;

    if(ul.getAttribute('id') === "toDoList"){
        var check = document.getElementById(`check${listItem.getAttribute('id')}`);
        check.setAttribute("checked","true");
        var span = document.getElementById(`span${listItem.getAttribute('id')}`);
        span.style.textDecoration='line-through';
        listItem.setAttribute("class","completed");
        completed.appendChild(listItem);
    }
    else{
        var check = document.getElementById(`check${listItem.getAttribute('id')}`);
        check.setAttribute("checked","false");
        var span = document.getElementById(`span${listItem.getAttribute('id')}`);
        span.style.textDecoration='none';
        listItem.setAttribute("class","todos");
        todos.appendChild(listItem);
    }
    localStorage.setItem("todos",todos.innerHTML);
    localStorage.setItem("completed",completed.innerHTML);
}

getValuesFromLocalStorag();