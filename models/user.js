module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
        },
        {},
    );

    User.associate = (models) => {
        User.hasMany(models.Book, { foreignKey: "userId" });
        User.hasMany(models.SearchHistory, { foreignKey: "userId" });
    };

    return User;
};
