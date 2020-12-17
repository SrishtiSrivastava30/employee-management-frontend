document.addEventListener('DOMContentLoaded', auth);
function auth(){
  if(localStorage.getItem('auth')){
    window.location.href = '/frontpage3.html';
  }
  else{
    loginProc();
  }
}
const loginProc = () => {
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  const signin = document.querySelector("#btn");
  const loginError = document.querySelector(".login-error");
  const userdata = {};
  const error = {};

  // -------------------Add event listener-----------------

  signin.addEventListener("click",run);
  function run(e){
        userdata.email = username.value;
        userdata.password = password.value;
      //   console.log(userdata);
        axios.post('http://localhost:3000/login', userdata)
            .then(res => {
                localStorage.setItem('auth', JSON.stringify(res.data));
                window.location.href = '/frontpage3.html';
            })
            .catch(err => {
                console.log('Bad request');
                loginError.innerHTML = 'Wrong Credentials..Try again'
            })
        e.preventDefault();
  }
}