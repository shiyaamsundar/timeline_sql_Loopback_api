import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// const config = {
//   name: 'db',
//   connector: 'mysql',
//   url: '',
//   host: '127.0.0.1',
//   port: 3306,
//   user: 'root',
//   password: '1234',
//   database: 'timeline'
// };

const config = {
  name: ' sql12379687',
  connector: 'mysql',
  url: '',
  host: 'sql12.freemysqlhosting.net',
  port: 3306,
  user: 'sql12379687',
  password: 'QLQZzvRMp5',
  database: 'sql12379687'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
