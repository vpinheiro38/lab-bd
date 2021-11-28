import { Injectable } from '@nestjs/common';
import { CreateCategoriesRoutineDto } from './dto/create-categories-routine.dto';
import { UpdateCategoriesRoutineDto } from './dto/update-categories-routine.dto';
var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'projeto',
  multipleStatements:true,  
});

@Injectable()
export class CategoriesRoutinesService {
  async create(createCategoriesRoutineDto: CreateCategoriesRoutineDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_category_routine_insert(?,?,@message,@success); SELECT @message,@success',
      [createCategoriesRoutineDto.category_id, createCategoriesRoutineDto.routine_id],
    );
    if(results[1][0]['@success'] > 0){
      const category = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: category };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }

  findAll() {
    return `This action returns all categoriesRoutines`;
  }

  async findOne(identificador: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'SELECT * from vw_category_routine WHERE id = ? LIMIT 1',[identificador]
    );
    if(!!results[0]){
      const { id, routine_id,routine_description, routine_user, category_id, category_description, category_user} = results[0]
      return { id, routine_id,routine_description, routine_user, category_id, category_description, category_user};
    }else{
      return {success: false, message: 'relação não encontrada'};
    }
  }

  update(id: number, updateCategoriesRoutineDto: UpdateCategoriesRoutineDto) {
    return `This action updates a #${id} categoriesRoutine`;
  }

  async remove(id: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_category_routine_delete(?,@message,@success); SELECT @message,@success',
      [id],
    );
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }
}
