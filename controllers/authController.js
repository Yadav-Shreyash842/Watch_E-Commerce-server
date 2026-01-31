const User = require ("../models/User");
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");


// Register users 

const registerUser = async (req , res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email and password" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const  user = new User ({
            name : name ,
            email : email,
            password: password
        });

        const savedUser = await user.save();
        const token = jwt.sign({
            id : savedUser._id, isAdmin: savedUser.isAdmin
        }, process.env.JWT_SECRET);
        
        // Remove password from response
        const userResponse = {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            isAdmin: savedUser.isAdmin
        };
        
        res.json({user: userResponse, token: token});
    } catch(error) {
        console.error("Registration error:", error);
        res.status(500).json({message : "registration failed", error: error.message});
    }
}

// login users 

const loginUser = async (req , res) => {
     try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email: email});

        if(!user) {
            return res.status(400).json({message : "User not found"});
        }
        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            return res.status(400).json({message : "Wrong Password"});
        }
        const token = jwt.sign({
            id : user._id, isAdmin: user.isAdmin
        }, process.env.JWT_SECRET );
        
        // Remove password from response
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        };
        
        res.json({token : token, user: userResponse});
     } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({message : "Login failed", error: error.message});
     }
}

// Get logged-in user
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
}

module.exports = {registerUser , loginUser, getMe}