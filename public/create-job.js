const formDOM = document.querySelector('.form');
const companyDOM = document.querySelector('#company');
const positionDOM = document.querySelector('#position');
const statusDOM = document.querySelector('#status');
const formAlertDOM = document.querySelector('.form-alert');
const formInputDOM = document.querySelectorAll('.form-input');
const btnDOM = document.querySelector('.btn');
const allJobsDOM = document.querySelector("#allJobs");

// job submit
formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const company = companyDOM.value;
    const position = positionDOM.value;
    const status = statusDOM.value;
    try {
        const { data } = await axios.post("/api/v1/jobs", { company, position, status }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        showJobs();
        e.target.reset();
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `Job successfully created`;

    }
    catch (err) {
        console.log(err);
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`;
        localStorage.removeItem("token");
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
    }, 2000)
});


// show data

const showJobs = async () => {
    const token = localStorage.getItem("token");

    try {

        const { data: { job } } = await axios.get("/api/v1/jobs", { headers: { Authorization: `Bearer ${token}` } });
        // console.log({ data: { job } });
        if (job.length < 1) {
            allJobsDOM.innerHTML = `<h5 class="empty-list">No Jobs found</h5>`;
            return
        }
        const allJObs = job.map((item) => {
            const { _id: jobId, company, position, status } = item;
            // console.log(jobId)
            return `<div class="resultform result">
                    <h5>company - ${company}</h5>
                    <h5>position - ${position}</h5>
                    <h5>status - ${status}</h5>
                    <div class="task-links">

                    <!-- edit link -->
                    <a href="edit-jobs.html?id=${jobId}"  class="edit-link">
                     edit
                    </a>

                    <!-- delete btn -->
                   
                    <button type="button" class="delete-btn" data-id="${jobId}">
                     delete
                    </button>
                    </div>
                    </div>`
        }).join(" ");
        allJobsDOM.innerHTML = allJObs;

    }
    catch (err) {
        console.log(err);
    }

}

showJobs();


// delete job
allJobsDOM.addEventListener("click", async (e) => {
    const el = e.target;
    // console.log(el)
    // console.log(el.classList.contains("delete-btn"))
    const token = localStorage.getItem("token");
    if (el.classList.contains("delete-btn")) {
        const id = el.dataset.id;
        try {

            await axios.delete(`/api/v1/jobs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            showJobs();

        }
        catch (err) {
            console.log(err)
        }
    }



})

