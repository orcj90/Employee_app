const employeesList = document.querySelector("tbody#employees-list")
let updateclick=0

fetch("http://localhost:3000/api/employees")
.then(res => res.json())
.then(employees => {
    employeesList.innerHTML = ""
    
    employees.forEach(employee => {
        employeesList.innerHTML += `
        <tr>
            <td><img src="https://randomuser.me/api/portraits/${ employee.id % 2 == 0 ?  'women' : 'men' }/${employee.id}.jpg"  /></td>
            <td>${employee.id}</td>
            <td>${employee.first_name} ${employee.last_name ? employee.last_name : '' }</td>
            <td>${employee.home_phone ? employee.home_phone : '' }</td>
            <td>${employee.address ? employee.address : ''}</td>
            <td>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#update">Edit</button>
            <button type="button" class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `
    });
    btn()
})









function update(){
    fetch("http://localhost:3000/api/employees")
.then(res => res.json())
.then(employees => {
    employeesList.innerHTML = ""
    
    employees.forEach(employee => {
        employeesList.innerHTML += `
        <tr>
            <td><img src="https://randomuser.me/api/portraits/${ employee.id % 2 == 0 ?  'women' : 'men' }/${employee.id}.jpg"  /></td>
            <td>${employee.id}</td>
            <td>${employee.first_name} ${employee.last_name ? employee.last_name : '' }</td>
            <td>${employee.home_phone ? employee.home_phone : '' }</td>
            <td>${employee.address ? employee.address : ''}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#update">Edit</button>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `
    });
    btn()
})
}





function btn(){
    lengtharr = document.querySelectorAll('button.btn.btn-warning').length
    for (let i=0 ; i<lengtharr; i++){
        document.querySelectorAll('button.btn.btn-danger')[i].addEventListener('click', function() {
            let btn1 =document.querySelectorAll("tbody tr td button.btn.btn-danger")[i].parentElement.parentElement.childNodes[3].innerText
            delemployee(btn1)

        })

        document.querySelectorAll('button.btn.btn-warning')[i].addEventListener('click', function() {
            let btn2 =document.querySelectorAll("tbody tr td button.btn.btn-warning")[i].parentElement.parentElement.childNodes[3].innerText
            updateclick=btn2
            document.querySelector("#employeeIDupdate").value = updateclick
        })
    }
}










function delemployee(id){
    fetch(`http://localhost:3000/api/employees/${id}` ,
    {
        method : "DELETE",
        headers: {"Content-type": "application/json;charset=UTF-8"},
    })

console.log("Employee del")
}







function updateemployee(){
    const id = updateclick
    const first_name = document.querySelector("#firstNameupdate").value
    const last_name = document.querySelector("#LastNameupdate").value
    const home_phone = document.querySelector("#phoneupdate").value
    const address = document.querySelector("#addressupdate").value
    const data = {first_name,last_name,home_phone,address}

    fetch(`http://localhost:3000/api/employees/${id}` ,
    {
        method : "PATCH" ,
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    })
    cln()
    update()
}








function newemployee(){
    const id = document.querySelector("#employeeID").value
    const first_name = document.querySelector("#firstName").value
    const last_name = document.querySelector("#LastName").value
    const home_phone = document.querySelector("#phone").value
    const address = document.querySelector("#address").value
    const data = {id,first_name,last_name,home_phone,address}

    fetch(`http://localhost:3000/api/employees/` ,
    {
        method : "POST" ,
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    })
    cln()
    update()
}





function cln(){
    updateclick=0
    document.querySelector("#firstNameupdate").value=""
    document.querySelector("#LastNameupdate").value=""
    document.querySelector("#phoneupdate").value=""
    document.querySelector("#addressupdate").value=""
    document.querySelector("#employeeIDupdate").value = "" 
    document.querySelector("#employeeIDupdate").value = ""

    document.querySelector("#employeeID").value = ""
    document.querySelector("#firstName").value=""
    document.querySelector("#LastName").value=""
    document.querySelector("#phone").value=""
    document.querySelector("#address").value=""
    document.querySelector("#employeeID").value = ""
}

console.log("working...")