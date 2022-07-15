
const formDOM = document.querySelector('.form');
const nameDOM = document.querySelector('#name');
const emailDOM = document.querySelector('#email');
const passwordDOM = document.querySelector('#password');
const formAlertDOM = document.querySelector('.form-alert');
const formInputDOM = document.querySelectorAll('.form-input');
const btnDOM = document.querySelector('.btn');


formDOM.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = emailDOM.value;
    const password = passwordDOM.value;
    try {
        const { data } = await axios.post("/api/v1/auth/login", { email, password });
        // console.log(data.token)
        e.target.reset();
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `successfully logged in`;
        localStorage.setItem('token', data.token);
        //location.assign('/api/v1/jobs');
    }
    catch (err) {
        // console.log(err);
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
        localStorage.removeItem('token')
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
    }, 2000)
});




