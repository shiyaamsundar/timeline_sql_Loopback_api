import {Entity, hasMany, model, property} from '@loopback/repository';
import {Task} from './task.model';

@model()
export class Project extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  postedby?: string;

  @property({
    type: 'string',
  })
  assignedto?: string;

  @property({
    type: 'string',
  })
  estimation?: number;

  @property({
    type: 'number',
  })
  workedhours?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'number',
  })
  adminId?: number;

  @hasMany(() => Task)
  tasks: Task[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
