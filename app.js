 //DEFINE UI VARS
const form= document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners()
{
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    // clear task btn
    clearBtn.addEventListener('click', clearTasks);
    // Filter task events
    filter.addEventListener('keyup', filterTasks);
}
//ADD TASK
function addTask(e)
{
    let c=0;
    d = removeDuplicate(c);
        if(d === 0)
        {
            if(taskInput.value === '')
            {
                alert('Add A Task');
            }
            //create li element
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';
            //create text node and append to li
            li.appendChild(document.createTextNode(taskInput.value));
            //create new link element
            const link = document.createElement('a');
            //add class
            link.className = 'delete-item secondary-content';
            // add icon html
            link.innerHTML = '<i class="fa fa-remove"></i>';
            li.appendChild(link);

            //append li to ul
            taskList.appendChild(li);

            //store in ls
            storeTaskInLocalStorage(taskInput.value);

            //clear input
            taskInput.value='';

            e.preventDefault();
        }
}
//remove task
function removeTask(e)
{
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are You Sure'))
        {
            e.target.parentElement.parentElement.remove();

            //remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
//remove task from local storage
function removeTaskFromLocalStorage(taskItem)
{
    //console.log(taskItem);
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index)
    {
        if(taskItem.textContent === task)
        {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// clear tasks
function clearTasks(e)
{
    //taskList.innerHTML = '';
    //Faster Way
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }

    //clear from ls
    clearTaskFromLocalStorage();
}
//clear task from ls;
function clearTaskFromLocalStorage()
{
    localStorage.clear();
}
//filter tasks
function filterTasks(e)
{
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task)
        {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) !== -1)
            {
                task.style.display = 'block';
            }
            else
            {
                task.style.display = 'none';
            }
        }
    );
}
// Store Task
function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// get tasks
function getTasks()
{
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task)
    {
        //console.log(task);
        //create li element
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    });
}
//remove duplicate
function removeDuplicate(c)
    {
        let tasks;
        if(localStorage.getItem('tasks') === null)
        {
            tasks = [];
        }
        else
        {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        const input = taskInput.value;
        tasks.forEach(function(task)
        {
            //console.log(task);
            if(task === input)
            {
                c++;
                alert('Task Already Added');
            }
        });
        return c;
    }
