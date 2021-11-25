import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto:GetTaskFilterDto):Task[]{
    const {status, search} = filterDto;
    let tasks = this.getAllTasks();
    if(status){
      tasks = tasks.filter(task=>task.status==status);
    }
    if(search){
      tasks = tasks.filter(task=>{
        if(task.description.includes(search)|| task.title.includes(search)){
          return true;
        }
        return false;
      })
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
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

  deleteTaskById(id: string): number {
    let idx = -1;
    let changedRecords = 0;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == id) {
        idx = i;
        break;
      }
    }
    if (idx != -1) {
      this.tasks.splice(idx, 1);
      changedRecords++;
    }
    return changedRecords;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    let idx = -1;
    this.tasks.forEach((task, index) => {
      if (task.id === id) {
        idx = index;
      }
    });
    this.tasks[idx].status = status;
    return this.tasks[idx];
  }
}
