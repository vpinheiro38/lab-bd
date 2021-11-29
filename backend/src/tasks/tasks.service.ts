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

  async findAll(user:string,completed:string,category:string,priority:string) {
    connection.connect();
    const queries = [];
    const params = [];
    if(!!user){
      queries.push(' user_id = ? ');
      params.push(user);
    }
    if(completed && completed === 'false'){

      queries.push(' completed_at IS NULL ');
    }else if(completed && completed === 'true'){
      queries.push(' completed_at IS NOT NULL ');
    }
    if(!!category){
      queries.push(' category_task_category_id IN (?) ');
      params.push(JSON.parse(category));
    }
    if(!!priority){
      queries.push(' task_priority IN (?) ');
      params.push(JSON.parse(priority));
    }

    connection.connect();
    //return  {frase: 'SELECT * from vw_tasks WHERE ' + queries.join(' and '), params}
    const [results, fields] = await connection.promise().query(
      'SELECT * from vw_tasks WHERE ' + queries.join(' and '), params
    );
    if(results.length > 0 ){
      return {succes:true, message: 'tasks encontradas', data: results};
    }else{
      return {success: false, message: 'tasks não encontradas'};
    }
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
