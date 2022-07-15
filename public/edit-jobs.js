const formDOM = document.querySelector('.form');
const companyDOM = document.querySelector('#company');
const positionDOM = document.querySelector('#position');
const statusDOM = document.querySelector('#status');
const formAlertDOM = document.querySelector('.form-alert');
const formInputDOM = document.querySelectorAll('.form-input');
const btnDOM = document.querySelector('.btn');
const allJobsDOM = document.querySelector("#allJobs");
// const params = window.location.search;
const params = new URLSearchParams(window.location.search)
const id = params.get("id");
// console.log(id)



const showJobs = async () => {
    try {
        const token = localStorage.getItem("token");
        const { data: { job } } = await axios.get(`/api/v1/jobs/${id}`, { headers: { Authorization: `Bearer ${token}` } });

        const { company, position, status } = job;
        // console.log(company, position, status)
        companyDOM.value = company;
        positionDOM.value = position;
        statusDOM.value = status;
    }
    catch (err) {
        console.log(err)
    }

}

showJobs();

formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        const companyedit = companyDOM.value;
        const positionedit = positionDOM.value;
        const statusedit = statusDOM.value;

        // console.log(companyedit)

        const data = await axios.patch(`/api/v1/jobs/${id}`, { company: companyedit, position: positionedit, status: statusedit }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        // console.log(data);

        e.target.reset();
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `Edit Successfully!`;


    }
    catch (err) {
        e.target.reset();
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `Error Please ,try again `;
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
    }, 3000)
});



