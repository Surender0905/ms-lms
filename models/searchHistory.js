module.exports = (sequelize, DataTypes) => {
    const SearchHistory = sequelize.define(
        "SearchHistory",
        {
            searchTerm: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {},
    );

    SearchHistory.associate = (models) => {
        SearchHistory.belongsTo(models.User, { foreignKey: "userId" });
    };

    return SearchHistory;
};
