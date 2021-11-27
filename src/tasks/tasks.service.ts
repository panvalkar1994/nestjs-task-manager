import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTaskWithFilters(filterDto:GetTaskFilterDto):Task[]{
  //   const {status, search} = filterDto;
  //   let tasks = this.getAllTasks();
  //   if(status){
  //     tasks = tasks.filter(task=>task.status==status);
  //   }
  //   if(search){
  //     tasks = tasks.filter(task=>{
  //       if(task.description.includes(search)|| task.title.includes(search)){
  //         return true;
  //       }
  //       return false;
  //     })
  //   }
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTaskById(id: string): number {
  //   let idx = -1;
  //   let changedRecords = 0;
  //   for (let i = 0; i < this.tasks.length; i++) {
  //     if (this.tasks[i].id == id) {
  //       idx = i;
  //       break;
  //     }
  //   }
  //   if (idx != -1) {
  //     this.tasks.splice(idx, 1);
  //     changedRecords++;
  //   }
  //   return changedRecords;
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task
  // }
}
