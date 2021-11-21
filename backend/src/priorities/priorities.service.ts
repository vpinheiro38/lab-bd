import { Injectable } from '@nestjs/common';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'projeto',
  multipleStatements:true,  
});

@Injectable()
export class PrioritiesService {
  async create(createPriorityDto: CreatePriorityDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_priority_insert(?,?,@message,@success); SELECT @message,@success',
      [createPriorityDto.description, createPriorityDto.number_priority],
    );
    if(results[1][0]['@success'] > 0){
      const user = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: user };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }

  async findAll() {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'SELECT * from vw_priorities',
    );
    if(results.length >0){
      return {success: true, message: 'prioridades encontradas', data: results};
    }else{
      return {success: false, message: 'prioridades não encontradas'};
    }
  }

  async findOne(identificator: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'SELECT * from vw_priorities WHERE id = ? LIMIT 1',[identificator]
    );
    if(!!results[0]){
      const {description, priority_number, created_at, updated_at} = results[0]
      return {description, priority_number, created_at, updated_at};
    }else{
      return {success: false, message: 'prioridade não encontrada'};
    }
  }

  update(id: number, updatePriorityDto: UpdatePriorityDto) {
    return `This action updates a #${id} priority`;
  }

  remove(id: number) {
    return `This action removes a #${id} priority`;
  }
}
