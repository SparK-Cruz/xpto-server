export class Auth {
  userId: number;
  username: string;
  updatedAt: Date;
  token: string;

  constructor() {
    this.updatedAt = new Date();
    this.token = this.generateNewToken();
  }

  private generateNewToken(): string{
    var chars = [[48,57],[65,90],[97,122]];
    var length = 16;
    var token = '';

    for(var i=0; i<length; i++){
      var addr = Math.floor(Math.random()*3);
      var type = chars[addr];
      token += String.fromCharCode(Math.floor(Math.random()*(type[1]+0.9-type[0]))+type[0]);
    }

    return token;
  }
}