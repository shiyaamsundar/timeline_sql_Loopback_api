import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  put,
  requestBody
} from '@loopback/rest';
import * as nodemailer from 'nodemailer';
import {
  Project,
  Task
} from '../models';
import {AdminRepository, ProjectRepository, TaskRepository} from '../repositories';



export class ProjectTaskController {
  constructor(
    @repository(ProjectRepository) protected projectRepository: ProjectRepository,
    @repository(AdminRepository) public adminRepository: AdminRepository,
    @repository(TaskRepository) public taskRepository: TaskRepository,
  ) { }

  @get('/admin/projects/{id}/tasks', {

    responses: {

      '200': {
        description: 'Array of Project has many Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: number,
    @param.query.object('filter') filter?: Filter<Project>,
  ): Promise<Task[]> {
    const admindet=await this.projectRepository.findById(id,filter)
    const email=admindet['postedby']
    const notcomp=await this.taskRepository.find({
      where: {and: [ {status:"not completed"},{projectId:id}]},})
      const comp=await this.taskRepository.find({
        where: {and: [ {status:"completed"},{projectId:id}]},})
        const prog=await this.taskRepository.find({
          where: {and: [ {status:"in progress"},{projectId:id}]},})
    const d:any={
      ["comp"]:comp,
      ["notcomp"]:notcomp,
      ["prog"]:prog
    }

          return d

  }
  @get('/intern/projects/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of Project has many Task',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Project)},
          },
        },
      },
    },
  })
  async findalltask(
    @param.path.string('id') id: number,
    @param.query.object('filter') filter?: Filter<Project>,
  ): Promise<Task[]> {
    const det=await this.projectRepository.findById(id,filter)
    const email=det['assignedto']
    const notcomp=await this.taskRepository.find({
      where: {and: [{assignedto:email}, {status:"not completed"},{projectId:id}]},})
      const comp=await this.taskRepository.find({
        where: {and: [{assignedto:email}, {status:"completed"},{projectId:id}]},})
        const prog=await this.taskRepository.find({
          where: {and: [{assignedto:email}, {status:"in progress"},{projectId:id}]},})
    const d:any={
      ["comp"]:comp,
      ["notcomp"]:notcomp,
      ["prog"]:prog
    }

          return d

  }

  @post('/admin/projects/{id}/tasks', {


    responses: {
      '200': {
        description: 'Project model instance',
        content: {'application/json': {schema: getModelSchemaRef(Task)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Project.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {
            title: 'NewTaskInProject',
            exclude: ['id'],
            optional: ['projectId']
          }),
        },
      },
    }) task: Omit<Task, 'id'>,
  ): Promise<Task> {


    const admindet=await this.adminRepository.find({where:{id:id}})

    console.log(admindet)

    const transporter = nodemailer.createTransport(
      `smtps://17tucs221@skct.edu.in:shiyaam123456789@smtp.gmail.com`
    );

    const mailOptions = {
      from : '17tucs221@skct.edu.in',
      to : `${task.assignedto}`,
      subject : `${task.title}`,
      text: `You have been invited to a task  by:- ${admindet[0]['email']} Descption:- ${task.description} `
    };

    transporter.sendMail( mailOptions, (error, info) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log(`Message Sent ${info.response}`);
    });

    console.log(admindet[0]['email'])



    return this.projectRepository.tasks(id).create(task);

  }
  @get('/task/{id}', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Task, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Task>,
  ): Promise<Task> {
    return this.taskRepository.findById(id,filter);
  }

  @patch('/admin/projects/{id}/tasks', {
    responses: {
      '200': {
        description: 'Project.Task PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Task, {partial: true}),
        },
      },
    })
    task: Partial<Task>,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.projectRepository.tasks(id).patch(task, where);
  }

  @del('/admin/projects/{id}/tasks', {
    responses: {
      '200': {
        description: 'Project.Task DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Task)) where?: Where<Task>,
  ): Promise<Count> {
    return this.projectRepository.tasks(id).delete(where);
  }

  @put('/admins/task/{id}', {
    responses: {
      '204': {
        description: 'Task PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() task: Task,
  ): Promise<void> {
    console.log("puttt",id,task)
    await this.taskRepository.replaceById(id,task);
  }



}
