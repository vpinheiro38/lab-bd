import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
var mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'projeto',
  multipleStatements:true,  
});

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_user_insert(?,?,?,@message,@success); SELECT @message,@success',
      [createUserDto.name,createUserDto.email,createUserDto.password],
    );
    if(results[1][0]['@success'] > 0){
      const user = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: user };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(identificador: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'SELECT * from vw_users WHERE id = ? LIMIT 1',[identificador]
    );
    if(!!results[0]){
      const {id, email, name, created_at, updated_at} = results[0]
      return {id, email, name, created_at, updated_at};
    }else{
      return {success: false, message: 'usuário não encontrado'};
    }
    
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_user_update(?,?,?,?,@message,@success); SELECT @message,@success',
      [id,updateUserDto.name,updateUserDto.email,updateUserDto.password],
    );
    if(results[1][0]['@success'] > 0){
      const user = await this.findOne(results[1][0]['@success']);
      return {message: results[1][0]['@message'], success: !!results[1][0]['@success'], data: user };
    }
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }

  async remove(id: number) {
    connection.connect();
    const [results, fields] = await connection.promise().query(
      'CALL pr_user_delete(?,@message,@success); SELECT @message,@success',
      [id],
    );
    return {message: results[1][0]['@message'], success: !!results[1][0]['@success'] };
  }
}
