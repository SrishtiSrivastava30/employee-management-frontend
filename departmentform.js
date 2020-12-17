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
    const departmentid = document.querySelector("#deptId");
    const departmentname = document.querySelector("#deptname");
    const headofdept = document.querySelector("#HODname");
    const button = document.querySelector("#submitt");
    const form = document.querySelector("#dept-form");
    const departmentdata = {};

    button.addEventListener("click",run);

    function run(e){


        departmentdata.id= departmentid.value;
        departmentdata.name= departmentname.value;
        departmentdata.hod= headofdept.value;

        axios.post('http://localhost:3000/adddepartment', departmentdata)
            .then(res => {
                form.reset();
                setTimeout(() => {
                    window.location.href = '/departmentview.html';
                }, 1000);
            })
            .catch(err => {
                console.log(err);
            })
        e.preventDefault();

    }
}