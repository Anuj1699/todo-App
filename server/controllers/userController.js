import userModel from './../models/userModel.js';
import bcrypt from "bcryptjs"

export const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Enter All Fields" })
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not Found" });
        }
        const pass = await bcrypt.compare(password, user.password);
        if(!pass){
            return res.status(400).json({message: "Invalid Password"});
        }
        const { password: _, ...rest } = user._doc;
        return res.status(201).json({user: rest});
    } catch (error) {
        next(error);
    }
}

export const userRegister = async (req, res, next) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ message: "Enter All Fields" })
    }

    try {
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            res.status(400).json({ message: "User Already Exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const user = new userModel({
            email: email,
            name: name,
            password: hashedPass
        })

        await user.save();
        return res.status(201).json({message: "User Created Succesfully"});
    } catch (error) {
        next(error)
    }
}