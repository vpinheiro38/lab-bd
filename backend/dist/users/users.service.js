"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
var mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'projeto',
    multipleStatements: true,
});
let UsersService = class UsersService {
    async create(createUserDto) {
        connection.connect();
        const [results, fields] = await connection.promise().query('CALL pr_user_insert(?,?,?,@message,@success); SELECT @message,@success', [createUserDto.name, createUserDto.email, createUserDto.password]);
        if (results[1][0]['@success'] > 0) {
            const user = await this.findOne(results[1][0]['@success']);
            return { message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: user };
        }
        return { message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
    }
    async login(loginUserDto) {
        connection.connect();
        const [results, fields] = await connection.promise().query('CALL pr_login(?,?,@message,@success); SELECT @message,@success', [loginUserDto.email, loginUserDto.password]);
        if (results[1][0]['@success'] > 0) {
            const user = await this.findOne(results[1][0]['@success']);
            return { message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: user };
        }
        return { message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
    }
    findAll() {
        return `This action returns all users`;
    }
    async findOne(identificador) {
        connection.connect();
        const [results, fields] = await connection.promise().query('SELECT * from vw_users WHERE id = ? LIMIT 1', [identificador]);
        if (!!results[0]) {
            const { id, email, name, created_at, updated_at } = results[0];
            return { id, email, name, created_at, updated_at };
        }
        else {
            return { success: false, message: 'usuário não encontrado' };
        }
    }
    async update(id, updateUserDto) {
        connection.connect();
        const [results, fields] = await connection.promise().query('CALL pr_user_update(?,?,?,?,@message,@success); SELECT @message,@success', [id, updateUserDto.name, updateUserDto.email, updateUserDto.password]);
        if (results[1][0]['@success'] > 0) {
            const user = await this.findOne(results[1][0]['@success']);
            return { message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: user };
        }
        return { message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
    }
    async remove(id) {
        connection.connect();
        const [results, fields] = await connection.promise().query('CALL pr_user_delete(?,@message,@success); SELECT @message,@success', [id]);
        return { message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map