const { SearchHistory, User } = require("../models");

exports.storeSearchHistory = async (req, res) => {
    const { userId, searchTerm } = req.body;

    if (!userId || !searchTerm) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newSearch = await SearchHistory.create({ userId, searchTerm });

        return res.status(201).json({
            message: "Search history saved successfully",
            search: newSearch,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error saving search history" });
    }
};
