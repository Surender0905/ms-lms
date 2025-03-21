const axios = require("axios");
const { Book, User, Tag } = require("../models");
const book = require("../models/book");
const { where } = require("sequelize");

exports.searchBooks = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${query}`,
        );
        const books = response.data.items.map((item) => ({
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.join(", ") || "Unknown Author",
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
        }));
        return res.status(200).json({ books });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books" });
    }
};

exports.saveBook = async (req, res) => {
    const { userId, title, author, thumbnail } = req.body;

    if (!userId || !title || !author) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingBook = await Book.findOne({ where: { title, userId } });
        if (existingBook) {
            return res.status(400).json({ message: "Book already saved" });
        }

        const newBook = await Book.create({ title, author, thumbnail, userId });
        return res.status(201).json({
            message: "Book saved successfully",
            book: newBook,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error saving book" });
    }
};

exports.addTagsToBook = async (req, res) => {
    const { bookId, tagNames } = req.body;

    if (!bookId || !Array.isArray(tagNames)) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const tags = await Promise.all(
            tagNames.map(async (name) => {
                return Tag.findOrCreate({ where: { name } }).then(
                    ([tag]) => tag,
                );
            }),
        );

        await book.setTags(tags);

        return res.status(200).json({
            message: "Tags added successfully",
            tags: tags.map((tag) => tag.name),
        });
    } catch (error) {
        return res.status(500).json({ message: "Error adding tags" });
    }
};

exports.searchBookByTagName = async (req, res) => {
    const { tagName } = req.query;

    try {
        const books = Book.findAll({
            include: {
                models: "Tags",
                where: {
                    name: tagName,
                },
            },
        });

        res.ststus(200).json({
            status: true,
            books,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error adding tags" });
    }
};
