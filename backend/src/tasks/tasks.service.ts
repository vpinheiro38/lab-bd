import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'projeto',
  multipleStatements:true,  
});

@Injectable()
export class TasksService {
  async create(createTaskDto: CreateTaskDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_task_insert(?,?,?,?,@message,@success); SELECT @message,@success',
      [createTaskDto.description, createTaskDto.completed, createTaskDto.task_priority, createTaskDto.task_user],
    );
    if(results[1][0]['@success'] > 0){
      const task = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: task };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }

  findAll() {
    return `This action returns all tasks`;
  }

  async findOne(identificador: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'SELECT * from vw_tasks WHERE id = ? LIMIT 1',[identificador]
    );
    if(!!results[0]){
      const { user_name, priority_id, priority_description, priority_number, id, description, completed, task_priority, task_user, created_at, updated_at, user_email} = results[0]
      return { user_name, priority_id, priority_description, priority_number, id, description, completed, task_priority, task_user, created_at, updated_at, user_email};
    }else{
      return {success: false, message: 'task não encontrada'};
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_task_update(?,?,?,?,?,@message,@success); SELECT @message,@success',
      [id, updateTaskDto.description, updateTaskDto.completed, updateTaskDto.task_priority, updateTaskDto.task_user],
    );
    if(results[1][0]['@success'] > 0){
      const task = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: task };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }

  async remove(id: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_task_delete(?,@message,@success); SELECT @message,@success',
      [id],
    );
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }
}
