import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'projeto',
  multipleStatements:true,  
});

@Injectable()
export class RoutinesService {
  async create(createRoutineDto: CreateRoutineDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_routine_insert(?,?,@message,@success); SELECT @message,@success',
      [createRoutineDto.description, createRoutineDto.routine_user],
    );
    if(results[1][0]['@success'] > 0){
      const routines = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: routines };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }

  findAll() {
    return `This action returns all routines`;
  }

  async findOne(identificador: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'SELECT * from vw_routines WHERE id = ? LIMIT 1',[identificador]
    );
    if(!!results[0]){
      const { id,description,user_email,user_name,user_id} = results[0]
      return { id,description,user_email,user_name,user_id};
    }else{
      return {success: false, message: 'rotina não encontrada'};
    }
  }

  update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return `This action updates a #${id} routine`;
  }

  async remove(id: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_routine_delete(?,@message,@success); SELECT @message,@success',
      [id],
    );
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }
}
