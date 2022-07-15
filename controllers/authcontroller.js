const UserSchema = require("../models/User");
const { StatusCodes } = require("http-status-codes");


const register = async (req, res) => {
    const { name, email, password } = req.body;
    const users = await UserSchema.findOne({ email });
    if (users) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `EmailId Already Exist` })
    }
    const user = await UserSchema.create({ name, email, password });
    const token = await user.createToken();
    console.log(req.user);
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `Please Provide email and password` });
    }

    const user = await UserSchema.findOne({ email });
    if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `User does not Exist !` });
    }


    const comparepassword = await user.comparePasswords(password);
    if (!comparepassword) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `Invalid Credentials !` });
    }

    const token = await user.createToken();

    const users = await UserSchema.find({ email, password });
    return res.status(StatusCodes.OK).json({ users: { email }, token });

}

const dashboard = async (req, res) => {
    res.send('Welcome to dashboard')
}

module.exports = { register, login, dashboard };

