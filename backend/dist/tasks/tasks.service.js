"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
var mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'projeto',
    multipleStatements: true,
});
let TasksService = class TasksService {
    async create(createTaskDto) {
        connection.connect();
        const [results, fields] = await connection.promise().query('CALL pr_task_insert(?,?,?,?,@message,@success); SELECT @message,@success', [createTaskDto.description, createTaskDto.completed, createTaskDto.task_priority, createTaskDto.task_user]);
        if (results[1][0]['@success'] > 0) {
            const task = await this.findOne(results[1][0]['@success']);
            return { message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: task };
        }
        return { message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
    }
    findAll() {
        return `This action returns all tasks`;
    }
    async findOne(identificador) {
        connection.connect();
        const [results, fields] = await connection.promise().query('SELECT * from vw_tasks WHERE id = ? LIMIT 1', [identificador]);
        if (!!results[0]) {
            const { user_name, priority_id, priority_description, priority_number, id, description, completed, task_priority, task_user, created_at, updated_at, user_email } = results[0];
            return { user_name, priority_id, priority_description, priority_number, id, description, completed, task_priority, task_user, created_at, updated_at, user_email };
        }
        else {
            return { success: false, message: 'task não encontrada' };
        }
    }
    async update(id, updateTaskDto) {
        connection.connect();
        const [results, fields] = await connection.promise().query('CALL pr_task_update(?,?,?,?,?,@message,@success); SELECT @message,@success', [id, updateTaskDto.description, updateTaskDto.completed, updateTaskDto.task_priority, updateTaskDto.task_user]);
        if (results[1][0]['@success'] > 0) {
            const task = await this.findOne(results[1][0]['@success']);
            return { message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: task };
        }
        return { message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
    }
    async remove(id) {
        connection.connect();
        const [results, fields] = await connection.promise().query('CALL pr_task_delete(?,@message,@success); SELECT @message,@success', [id]);
        return { message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map