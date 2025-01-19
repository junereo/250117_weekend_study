const { Model , DataTypes} = require('sequelize');

class BookList extends Model {
    static initialize(sequelize){
        BookList.init(
            {
                name : { 
                    type : DataTypes.STRING(50),
                    allowNull : false,
                },
                path : {
                    type : DataTypes.STRING(100),
                    allowNull : false
                }
            },
            {
                sequelize,
                timestamps : true,
                freezeTableName : true,
            }
        )
        return BookList;
    }
}

module.exports = BookList;