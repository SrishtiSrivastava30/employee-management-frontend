document.addEventListener('DOMContentLoaded', fetchPayroll);
const root = document.getElementById('emp-details-root');
let id;
function fetchPayroll(){
    if(localStorage.getItem('auth')){
        let emp_id = window.location.href.split('=')[1];
        axios.post('http://localhost:3000/empPayroll', {emp_id})
            .then(res => {
                if(res.data.message.length === 0){
                    root.innerHTML = 'Payroll details not added yet...please add them first';
                }
                else{
                    renderData(res.data.message[0]);
                }
                console.log(res.data);
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
                        <th>Basic</th>
                        <th>Bonus</th>
                        <th>TA</th>
                        <th>DA</th>
                        <th>HRA</th>
                        <th>Medical</th>
                        <th>Tax</th>
                        <th>Leaves</th>
                        <th>Net Salary</th>
                        <th>Delete</th>
                    </tr>`;
    table.innerHTML = headings;
    id = data.EMP_ID;
    let empDetails = `
    <tr>
    <td>${data.DEPT_ID}</td>
    <td>${data.EMP_ID}</td>
    <td>${data.BASIC}</td>
    <td>${data.BONUS}</td>
    <td>${data.TA}</td>
    <td>${data.DA}</td>
    <td>${data.HRA}</td>
    <td>${data.MEDICAL_ALLOWANCE}</td>
    <td>${data.TAX}</td>
    <td>${data.LEAVES}</td>
    <td>${data.NET_SALARY}</td>
    <td><button id="delete-employee">Delete Employee</button></td>
    </tr>
`
    table.innerHTML += empDetails;
    root.appendChild(table);
    document.getElementById('delete-employee').addEventListener('click', deleteEmployee);
}
function deleteEmployee(){
    axios.post('http://localhost:3000/deleteemployee', {emp_id: id})
         .then(res => {
             setTimeout(() => {
                 window.location.href = '/viewemployee.html';
             }, 1000);
         })
         .catch(err => {
             console.log(err);
         })
}