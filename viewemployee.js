document.addEventListener('DOMContentLoaded', fetchEmployees);
let root = document.getElementById('view-emp-root');
function fetchEmployees(){
    if(localStorage.getItem('auth')){
        axios.get('http://localhost:3000/empdetails')
        .then(res => {
            renderData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    else{
        window.location.href = '/frontpage2.html';
    }
}
function renderData(data){
    const table = document.createElement('table');
    let headings = `<tr>
                        <th>Department Id</th>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Phone Numbe</th>
                        <th>Address</th>
                        <th>Add</th>
                        <th>View</th>
                    </tr>`;
    table.innerHTML = headings;
    data.message.forEach(x => {
        let empDetails = `
                       <tr>
                       <td>${x.DEPT_ID}</td>
                       <td>${x.EMP_ID}</td>
                       <td>${x.EMP_NAME}</td>
                       <td>${x.EMP_MAIL}</td>
                       <td>${x.EMP_PHONE}</td>
                       <td>${x.EMP_ADDRESS}</td>
                       <td><a href='/payrollform.html?id=${x.EMP_ID}&did=${x.DEPT_ID}'><button>Add payroll</button></a></td>
                       <td><a href='/employeeDetails.html?id=${x.EMP_ID}'><button>View Payroll</button></a></td>
                       </tr>
        `
        table.innerHTML += empDetails;
    });
    root.appendChild(table)

}