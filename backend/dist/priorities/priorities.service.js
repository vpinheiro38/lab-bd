"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrioritiesService = void 0;
const common_1 = require("@nestjs/common");
var mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'projeto',
    multipleStatements: true,
});
let PrioritiesService = class PrioritiesService {
    async create(createPriorityDto) {
        connection.connect();
        const [results, fields] = await connection.promise().query('CALL pr_priority_insert(?,?,@message,@success); SELECT @message,@success', [createPriorityDto.description, createPriorityDto.number_priority]);
        if (results[1][0]['@success'] > 0) {
            const user = await this.findOne(results[1][0]['@success']);
            return { message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: user };
        }
        return { message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
    }
    async findAll() {
        connection.connect();
        const [results, fields] = await connection.promise().query('SELECT * from vw_priorities');
        if (results.length > 0) {
            return { success: true, message: 'prioridades encontradas', data: results };
        }
        else {
            return { success: false, message: 'prioridades não encontradas' };
        }
    }
    async findOne(identificator) {
        connection.connect();
        const [results, fields] = await connection.promise().query('SELECT * from vw_priorities WHERE id = ? LIMIT 1', [identificator]);
        if (!!results[0]) {
            const { description, priority_number, created_at, updated_at } = results[0];
            return { description, priority_number, created_at, updated_at };
        }
        else {
            return { success: false, message: 'prioridade não encontrada' };
        }
    }
    update(id, updatePriorityDto) {
        return `This action updates a #${id} priority`;
    }
    remove(id) {
        return `This action removes a #${id} priority`;
    }
};
PrioritiesService = __decorate([
    (0, common_1.Injectable)()
], PrioritiesService);
exports.PrioritiesService = PrioritiesService;
//# sourceMappingURL=priorities.service.js.map