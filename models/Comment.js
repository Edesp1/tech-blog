const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections'); 

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            porimarykey: true,
            autoIncrement: true,
        },
        commentContent: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        dateCreated: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        postId: {
            type: DataTypes.INTEGER,
            refernces: {
                model: 'post',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timeStamps: false,
        freezeTableName: true,
        udnerscored: true,
        modelname: 'comment',
    }
);

module.exports = Comment;