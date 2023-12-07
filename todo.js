const tasks = document.querySelector('.tasksBlock');
const inputValues = []
const addinput=document.querySelector(".add-task-value")

// Add New Task
function addNewTask(element) {
  let taskView = ''
  inputValues.push(element.previousElementSibling.value)
  // console.log(element);
  // Bir önceki elementi seç
  for (let inputValue of inputValues) {
  
    taskView += `
    <div class="input-group mb-3 w-75 ">
        <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" onclick="doneTask(this)">
        </div>
        <input type="text" class="form-control" aria-label="Text input with checkbox" value="${inputValue}" disabled>
        <button class="btn btn-outline-danger" type="button" onclick="deleteTask(this)">Delete</button>
        <button class="btn btn-outline-success edit" type="button" onclick="editTask(this)">Edit</button>
    </div>
    `
    tasks.innerHTML = taskView;
    addinput.value='';
  }
 
}

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
  if(addinput.value!==""){
  addNewTask(this);}

});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && addinput.value!=="") {
    event.preventDefault();
    addNewTask(addBtn); // Call your function when Enter is pressed
  }
});

// Delete Task
function deleteTask(element) {
  // console.log(element)
  const parentElement = element.parentElement;
  tasks.removeChild(parentElement);
}

// Done Task
function doneTask(element) {
  if (element.checked) {
    element.parentElement.nextElementSibling.style.textDecoration = "line-through";
    element.parentElement.nextElementSibling.setAttribute("disabled", true)
    element.parentElement.parentElement.lastElementChild.setAttribute("disabled", true)
  } else {
    element.parentElement.nextElementSibling.style.textDecoration = "none";
    element.parentElement.nextElementSibling.style.background = "none";
    element.parentElement.parentElement.lastElementChild.removeAttribute("disabled")

  }
}

//Edit task
let count = 0;
function editTask(element) {
  count++;
  if (count % 2 === 1) {
    //   event.previousElementSibling.previousElementSibling.setAttribute("value",previousElementValue)
    element.previousElementSibling.previousElementSibling.removeAttribute("disabled")
    element.textContent = "Update"
    let previousValue = inputValues.indexOf(element.previousElementSibling.previousElementSibling.value)
    indx=previousValue
    inputValues.splice(previousValue, 1)
  }
  else {
    const newElement = element.previousElementSibling.previousElementSibling;
    inputValues.splice(indx, 0, newElement.value);
    element.previousElementSibling.previousElementSibling.setAttribute("disabled", true)
    element.textContent = "Edit"
  }
}
