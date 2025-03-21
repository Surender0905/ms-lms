const { User } = require("../models");

exports.registerUser = async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: "Missing fields" });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = await User.create({ username, email });
        return res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error creating user" });
    }
};
