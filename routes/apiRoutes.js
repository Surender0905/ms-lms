const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const searchHistoryController = require("../controllers/searchHistoryController");

// User routes
router.post("/users", userController.registerUser);

// Book routes
router.get("/books/search", bookController.searchBooks);
router.post("/books/save", bookController.saveBook);
router.post("/books/:bookId/tags", bookController.addTagsToBook);

// Search history routes
router.post("/search-history", searchHistoryController.storeSearchHistory);

module.exports = router;
