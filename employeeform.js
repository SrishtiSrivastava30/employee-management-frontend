const auth = () => {
  if(localStorage.getItem('auth')){
    loginProc();
  }
  else{
    window.location.href = '/frontpage2.html';
  }
}
document.addEventListener('DOMContentLoaded', auth);
const loginProc = () => {
    const employeeid = document.querySelector("#empId");
    const departmentid = document.querySelector("#deptId");
    const name = document.querySelector("#EmpName");
    const phoneNumber = document.querySelector("#phno");
    const Email = document.querySelector("#mail");
    const Address = document.querySelector("#address");
    const button = document.querySelector("#bttn");
    const form = document.querySelector("#emp-form");
    const employeedata= {};

    button.addEventListener("click",run);
    function run(e){
        employeedata.emp_id = employeeid.value;
        employeedata.dept_id = departmentid.value;
        employeedata.name = name.value;
        employeedata.phone = phoneNumber.value;
        employeedata.email = Email.value;
        employeedata.address = Address.value;
        axios.post('http://localhost:3000/addemployee', employeedata)
            .then(res => {
                form.reset();
                setTimeout(() => {
                    window.location.href = '/viewemployee.html';
                }, 1000);
            })
            .catch(err => {
                console.log(err);
            })
        e.preventDefault();
    }
}