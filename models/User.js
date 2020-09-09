<<<<<<< HEAD
<<<<<<< HEAD
=======
//const { Model } = require("sequelize");

>>>>>>> 1ae4a437a38998b542b1c90aa2e813bce312cc0d
=======
//const { Model } = require("sequelize");

>>>>>>> 719e450c1ba51274b8ff9b5e9f88d155976c8ad1
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Make sure connection path is correct!
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSynce(loginPassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 11);
                return newUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;