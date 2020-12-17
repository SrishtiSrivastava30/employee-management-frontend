let root = document.getElementById('view-dep-root');
function fetchDepartments(){
    if(localStorage.getItem('auth')){
        axios.get('http://localhost:3000/depdetails')
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
document.addEventListener('DOMContentLoaded', fetchDepartments);
function renderData(data){
    let idArray = [];
    const table = document.createElement('table');
    let headings = `<tr >
                        <th>Department Id</th>
                        <th>Department Name</th>
                        <th>Head of Department</th>
                        <th>Delete Row</th>
                    </tr>`;
    table.innerHTML = headings;
    data.message.forEach(x => {
        idArray.push(x.DEPT_ID);
        let empDetails = `
                        <tr >
                            <td>${x.DEPT_ID}</td>
                            <td>${x.DEPT_NAME}</td>
                            <td>${x.HEAD_OF_DEPARTMENTS}</td>
                            <td><button  id="${x.DEPT_ID}">Delete Department</button></td>
                        </tr>
        `
        table.innerHTML += empDetails;


    });
    root.appendChild(table)
    idArray.forEach(x => {
        document.getElementById(x).addEventListener('click', deleteDept);
    })

}
function deleteDept(e){
    axios.post('http://localhost:3000/deleteDepartment', {dept_id: e.target.id})
         .then(res => {
             window.location.reload();
         })
         .catch(err => {
             console.log(err);
         })
}