import * as restify from 'restify';
import { AuthHandler } from './auth/handler';
import { CustomerHandler } from './customers/handler';
import { UserHandler } from './users/handler';
import { normal, restrict } from './handlers';

export class Server {
  private srv: restify.Server;

  private _auth: AuthHandler = null;
  private _customer: CustomerHandler = null;
  private _user: UserHandler = null;

  constructor(server: restify.Server){
    this.srv = server;
  }

  public bindAuth(prefix: string): void {
    if (this._auth !== null)
      return;

    let auth = this._auth = new AuthHandler();

    //bindings
    this.srv.post(prefix, normal(auth.create));
    this.srv.put(prefix, restrict(auth.noop));
    this.srv.del(prefix, restrict(auth.destroy));
  }

  public bindUser(prefix: string): UserHandler {
    if (this._user !== null)
      return;

    let user = this._user = new UserHandler();

    this.srv.get(prefix+'/:id', restrict(user.get));
  }

  public bindCustomer(prefix: string): void {
    if (this._customer !== null)
      return;

    let customer = this._customer = new CustomerHandler();

    //bindings
    this.srv.post(prefix+'/search', restrict(customer.search));
    this.srv.get(prefix, restrict(customer.list));
    this.srv.post(prefix, restrict(customer.create));
    this.srv.get(prefix+'/:id', restrict(customer.get));
    this.srv.put(prefix+'/:id', restrict(customer.update));
    this.srv.del(prefix+'/:id', restrict(customer.destroy));
  }
}