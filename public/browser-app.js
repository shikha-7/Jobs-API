
const formDOM = document.querySelector('.form');
const nameDOM = document.querySelector('#name');
const emailDOM = document.querySelector('#email');
const passwordDOM = document.querySelector('#password');
const formAlertDOM = document.querySelector('.form-alert');
const formInputDOM = document.querySelectorAll('.form-input');
const btnDOM = document.querySelector('.btn');

// register submit
formDOM.addEventListener("submit", async (e) => {

    e.preventDefault();
    const name = nameDOM.value;
    const email = emailDOM.value;
    const password = passwordDOM.value;
    try {
        await axios.post("/api/v1/auth/register", { name, email, password });
        e.target.reset();
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `successfully registerd`;
    }
    catch (err) {
        console.log(err);
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }

});









//delete 




