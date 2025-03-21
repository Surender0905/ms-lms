const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
});

const User = require("./user")(sequelize, DataTypes);
const Book = require("./book")(sequelize, DataTypes);
const Tag = require("./tag")(sequelize, DataTypes);
const SearchHistory = require("./searchHistory")(sequelize, DataTypes);
const BookTags = require("./bookTags")(sequelize, DataTypes);

// Associations
User.hasMany(Book, { foreignKey: "userId" });
Book.belongsTo(User, { foreignKey: "userId" });

Book.belongsToMany(Tag, { through: BookTags });
Tag.belongsToMany(Book, { through: BookTags });

User.hasMany(SearchHistory, { foreignKey: "userId" });
SearchHistory.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Book, Tag, SearchHistory, BookTags };
