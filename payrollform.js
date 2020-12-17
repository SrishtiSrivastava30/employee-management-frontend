const departmentid = document.querySelector("#deptId");
const employeeid = document.querySelector("#Empid");
const basicpay = document.querySelector("#basic");
const bonuspay = document.querySelector("#bonus");
const houserent = document.querySelector("#hra");
const medical = document.querySelector("#MA");
const travel = document.querySelector("#ta");
const dearness = document.querySelector("#da");
const taxpay = document.querySelector("#tax");
const days = document.querySelector("#leave");
const payrollset = document.querySelector("#payroll");
const form = document.querySelector("#payroll-form");
const payrolldata = {};
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('auth')){
        let tempId = window.location.href.split('=')[1].split('&')[0];
        axios.post('http://localhost:3000/empPayroll', {emp_id: tempId})
        .then(res => {
            if(res.data.message.length > 0){
                alert('Payroll already set');
                setTimeout(() => {
                    window.location.href = '/viewemployee.html';
                }, 1000);   
            }
        })
        .catch(err => {
            console.log(err);
        })
        employeeid.value = tempId || 'Employee ID here';
        departmentid.value = window.location.href.split('=')[2] || 'Department ID here';
    }
    else{
        window.location.href = '/frontpage2.html';
    }
})

payrollset.addEventListener("click",run);

function run(e){

    payrolldata.dept_id= departmentid.value;
    payrolldata.emp_id= employeeid.value;
    payrolldata.basic= Number(basicpay.value);
    payrolldata.bonus= Number(bonuspay.value);
    payrolldata.hra=   Number(houserent.value);
    payrolldata.medical= Number(medical.value);
    payrolldata.ta= Number(travel.value);
    payrolldata.da= Number(dearness.value);
    payrolldata.tax= Number(taxpay.value);
    payrolldata.leaves= Number(days.value);
    // console.log(payrolldata);

    axios.post('http://localhost:3000/addpayroll', payrolldata)
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