import { Injectable } from '@nestjs/common';
import { CreateDisponibilityDto } from './dto/create-disponibility.dto';
import { UpdateDisponibilityDto } from './dto/update-disponibility.dto';

var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'projeto',
  multipleStatements:true,  
});

@Injectable()
export class DisponibilitiesService {
  async create(createDisponibilityDto: CreateDisponibilityDto) {
      connection.connect();
      const [results, fields] = await connection.promise().query(
        'CALL pr_disponibility_insert(?,?,?,?,?,@message,@success); SELECT @message,@success',
        [createDisponibilityDto.routine_id, createDisponibilityDto.day_id, createDisponibilityDto.disponibility_morning, createDisponibilityDto.disponibility_afternoon, createDisponibilityDto.disponibility_night],
      );
      if(results[1][0]['@success'] > 0){
        const disponibility = await this.findOne(results[1][0]['@success']);
        return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: disponibility };
      }
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };  
  }

  findAll() {
    return `This action returns all disponibilities`;
  }

  async findOne(identificador: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'SELECT * from vw_disponibilities WHERE id = ? LIMIT 1',[identificador]
    );
    if(!!results[0]){
      const disponibility = results[0]
      return disponibility;
    }else{
      return {success: false, message: 'disponibilidade não encontrada'};
    }
  }

  async update(id: number, updateDisponibilityDto: UpdateDisponibilityDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_disponibility_update(?,?,?,?,?,?,@message,@success); SELECT @message,@success',
      [id,updateDisponibilityDto.routine_id, updateDisponibilityDto.day_id, updateDisponibilityDto.disponibility_morning, updateDisponibilityDto.disponibility_afternoon, updateDisponibilityDto.disponibility_night],
      
    );
    if(results[1][0]['@success'] > 0){
      const disponibility = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: disponibility };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }

  async remove(id: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_disponibility_delete(?,@message,@success); SELECT @message,@success',
      [id],
    );
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }
}
