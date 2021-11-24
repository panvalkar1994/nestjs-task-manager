import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id:string):Task{
      return this.tasks.find(task=>task.id===id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id:string):number{
      let idx = -1;
      let changedRecords = 0;
      for(let i=0; i<this.tasks.length; i++){
          if(this.tasks[i].id==id){
            idx = i;
            break;
          }
      }
      if(idx!=-1){
          this.tasks.splice(idx, 1);
          changedRecords++;
      }
      return changedRecords;
  }
}
