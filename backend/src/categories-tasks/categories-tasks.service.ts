import { Injectable } from '@nestjs/common';
import { CreateCategoriesTaskDto } from './dto/create-categories-task.dto';
import { UpdateCategoriesTaskDto } from './dto/update-categories-task.dto';
var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'projeto',
  multipleStatements:true,  
});

@Injectable()
export class CategoriesTasksService {
  async create(createCategoriesTaskDto: CreateCategoriesTaskDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_category_task_insert(?,?,@message,@success); SELECT @message,@success',
      [createCategoriesTaskDto.category_id, createCategoriesTaskDto.task_id],
    );
    if(results[1][0]['@success'] > 0){
      const category = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: category };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }
  

  findAll() {
    return `This action returns all categoriesTasks`;
  }

  async findOne(identificador: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'SELECT * from vw_category_task WHERE id = ? LIMIT 1',[identificador]
    );
    if(!!results[0]){
      const { id,category_id,category_description,task_id,task_description,task_completed} = results[0]
      return { id, category_id,category_description,task_id,task_description,task_completed};
    }else{
      return {success: false, message: 'relação não encontrada'};
    }
  }

  update(id: number, updateCategoriesTaskDto: UpdateCategoriesTaskDto) {
    return `This action updates a #${id} categoriesTask`;
  }

  async remove(id: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_category_task_delete(?,@message,@success); SELECT @message,@success',
      [id],
    );
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }
}
