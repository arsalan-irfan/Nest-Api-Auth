import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from './user.entity';


export type User1 = any;



@Injectable()
export class UsersService {
  private readonly users: User1[]=[];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }
      // this.users = [
      //   {
      //     userId: 1,
      //     username: 'john',
      //     password: 'changeme',
      //   },
      //   {
      //     userId: 2,
      //     username: 'chris',
      //     password: 'secret',
      //   },
      //   {
      //     userId: 3,
      //     username: 'maria',
      //     password: 'guess',
      //   },
      // ];
  

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }
  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }
  async findOne(email: string): Promise<User | undefined> {
    console.log("User Service "+email)
    return await this.userRepository.findOne(email);
  }
  async findOneUser(email: string): Promise<User | undefined> {
    console.log(email);
    return await this.userRepository.findOne(email);
  }
  
}