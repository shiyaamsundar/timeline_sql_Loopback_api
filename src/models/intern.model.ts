import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Admin} from './admin.model';
import {Task} from './task.model';

@model()
export class Intern extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  fname?: string;

  @property({
    type: 'string',
  })
  lname?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  college?: string;

  @property({
    type: 'string',
  })
  intern_period?: string;

  @belongsTo(() => Admin)
  adminId: number;

  @hasMany(() => Task)
  tasks: Task[];

  constructor(data?: Partial<Intern>) {
    super(data);
  }
}

export interface InternRelations {
  // describe navigational properties here
}

export type InternWithRelations = Intern & InternRelations;
