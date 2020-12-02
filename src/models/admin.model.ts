import {Entity, hasMany, model, property} from '@loopback/repository';
import {Project} from './project.model';
import {Task} from './task.model';

@model()
export class Admin extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @hasMany(() => Project)
  projects: Project[];

  @hasMany(() => Task)
  tasks: Task[];

  constructor(data?: Partial<Admin>) {
    super(data);
  }
}

export interface AdminRelations {
  // describe navigational properties here
}

export type AdminWithRelations = Admin & AdminRelations;
