const { Model } = require("sequelize");

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// make sure connection path is correct
const sequelize = require('../config/connection');

class User extends Model {

}