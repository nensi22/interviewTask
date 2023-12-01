import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../../models/users.js";

export const registerUser = async(req,res) => {
    try{
        const {firstName,lastName,email,password} = req.body;
        const existingUser  = await User.findOne({ where: { email: email } });
        if(existingUser ) {
            res.status(200).json({message : "on this email user already registered."})
        } else {
            const hashedPass = await bcrypt.hash(password,10);

            const newUser = {
                firstName,
                lastName,
                email,
                password: hashedPass, 
            };

        const createdUser = await User.create(newUser);

        res.status(200).json({ success: true, message: 'User registered successfully', 
                user: { firstName:createdUser.firstName, lastName:createdUser.lastName, email: createdUser.email } });
        }

    }catch(error) {
        console.log('error registerUser : ', error)
    }
}

export const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body;

        const user  = await User.findOne({ where: { email: email } });
        if( !user ) {
            res.status(401).json({message : "invalid credential"})
        } 

        const passMatch = await bcrypt.compare(password, user.password);
        if( !passMatch ) {
            res.status(401).json({message : "invalid credential"})
        } 
        const token = jwt.sign( {user: user}, 'JWTSECRET', { expiresIn: '2h' });
          
        res.status(200).json({ success: true, message: 'User login successfully', user: { token: token } });
            
    }catch(error) {
        console.log('error loginUser : ', error)
    }
}

export const updateUser = async(req,res) => {
    try{
        const {userId} = req.params;
        const {firstName,lastName,email,password} = req.body;

        const user  = await User.findByPk(userId);
        if( !user) {
            res.status(401).json({message : "user not found"})
        } 
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email: email } });

            if (existingUser) {
                return res.status(400).json({ message: 'Email already use' });
            }
        }
        
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        
        if (password) {
            const hashedPwd = await bcrypt.hash(password, 10);
            user.password = hashedPwd;
        }

        await user.save();

        res.status(200).json({ success: true, message: 'User updated successfully', user: user });
        
    }catch(error) {
        console.log('error updateUser : ', error)
    }
}