import * as Sequelize from 'sequelize';

var instance: Sequelize.Sequelize = null;

export function get(): Sequelize.Sequelize{
  if(instance == null){
    //TODO tirar config da base e senha daqui
    //     jogar dentro de env vars e passar por parametro no makefile
    instance = new Sequelize(
      'solyos_xpto',
      'root',
      '',
      {
        host: 'localhost',
        dialect: 'mysql'
      }
    );
  }
  return instance;
}
