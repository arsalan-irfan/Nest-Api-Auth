import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Todo} from './todo.entity'

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>
    ){}
    
    async findAll(): Promise<Todo[]> {
        return this.todoRepository.find()
    }
    async findOne(id): Promise<Todo> {
        return await this.todoRepository.findOne(id)
    }
    async create(title:string): Promise<Todo> {
        let newTodo=new Todo();
        newTodo.title=title;
        return await this.todoRepository.save(newTodo);
    }
    async delete(id): Promise<Todo> {
        let selectedTodo = await this.todoRepository.findOne(id)
        return await this.todoRepository.remove(selectedTodo)
    }
    async update(id,title): Promise<Todo> {
        let selectedTodo = await this.todoRepository.findOne(id)
        selectedTodo.title=title;
        return await this.todoRepository.save(selectedTodo)
    }
}
