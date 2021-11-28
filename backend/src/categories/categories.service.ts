import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'projeto',
  multipleStatements:true,  
});

@Injectable()
export class CategoriesService {
  async create(createCategoryDto: CreateCategoryDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_category_insert(?,?,@message,@success); SELECT @message,@success',
      [createCategoryDto.description, createCategoryDto.category_user],
    );
    if(results[1][0]['@success'] > 0){
      const category = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: category };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }

  findAll() {
    return `This action returns all categories`;
  }

  async findOne(identificador: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'SELECT * from vw_categories WHERE id = ? LIMIT 1',[identificador]
    );
    if(!!results[0]){
      const { id,description,category_user,created_at,updated_at, user_email, user_name, user_id} = results[0]
      return { id,description,category_user,created_at,updated_at, user_email, user_name, user_id};
    }else{
      return {success: false, message: 'categoria não encontrada'};
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_category_update(?,?,?,@message,@success); SELECT @message,@success',
      [id, updateCategoryDto.description, updateCategoryDto.category_user],
    );
    if(results[1][0]['@success'] > 0){
      const category = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: category };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }

  async remove(id: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_category_delete(?,@message,@success); SELECT @message,@success',
      [id],
    );
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }
}
