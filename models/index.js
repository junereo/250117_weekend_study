const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config.js')
const BookList = require('./file.model')
const db = config.db.development;
// 시퀄라이즈 연결 인스턴스 객체 생성

const sequelize = new Sequelize(db.database, db.user, db.pass, db);

const book =  BookList.initialize(sequelize);

module.exports = book;

