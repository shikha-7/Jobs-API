const { StatusCodes } = require("http-status-codes");
const JobSchema = require("../models/Job");

const createJob = async (req, res) => {
    // console.log(req.user.userId);
    // console.log(req.body)
    req.body.createdBy = req.user.userId;
    const job = await JobSchema.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

const getAllJob = async (req, res) => {
    const job = await JobSchema.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ count: job.length, job });
}


const getSingleJob = async (req, res) => {
    // const id = req.params.id;
    // const userId = req.user.userId;

    const {
        user: { userId },
        params: { id: jobId }

    } = req;
    const job = await JobSchema.findOne({ createdBy: userId, _id: jobId });
    if (!job) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `No job with Id ${jobId}` })
    }
    res.status(StatusCodes.OK).json({ job })

}

const updateJob = async (req, res) => {

    const {
        body: { company, position },
        params: { id: jobId },
        user: { userId }
    } = req;

    if (company == '' || position == '') {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `company and postion fields can not be empty!` })
    }

    const job = await JobSchema.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });
    if (!job) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `NO Job find with the id ${jobId}` })
    }
    res.status(StatusCodes.OK).json({ job });

}

const deleteJob = async (req, res) => {

    const {
        user: { userId },
        params: { id: jobId }

    } = req;

    const job = await JobSchema.findByIdAndRemove({ _id: jobId, createdBy: userId });
    if (!job) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `NO Job find with the id ${jobId}` })
    }
    res.status(StatusCodes.OK).json({ msg: `The job deleted.` });
}

module.exports = { createJob, getAllJob, getSingleJob, updateJob, deleteJob }