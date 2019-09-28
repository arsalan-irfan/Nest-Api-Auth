import { Controller,Get,Param,Body,Post,Put,Delete } from '@nestjs/common';
import {TodoService} from './todo.service'
import {Todo} from './todo.entity'

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService:TodoService){}
    
    @Get()
    getTodos():Promise<Todo[]>{
        return this.todoService.findAll();
    }
    @Get(':id')
    getTodo(@Param('id') id):Promise<Todo>{
        return this.todoService.findOne(id);
    }
    @Post()
    create(@Body() body): Promise<Todo> {
        return this.todoService.create(body.title);
    }
    @Delete(':id')
    deleteTodo(@Param('id') id){
        return this.todoService.delete(id);
    }
    @Put(':id')
    update(@Param('id') id,@Body() body): Promise<Todo> {
        return this.todoService.update(id,body.title);
    }

}
