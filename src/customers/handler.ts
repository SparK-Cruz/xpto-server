import * as restify from 'restify';
import { CustomerService } from './service';
import { Customer } from './customer';

var service = new CustomerService();

export class CustomerHandler {
  public create(req: any, res: restify.Response): void{
    service.create(req.body)
      .then((created: Customer) => {
        res.send(201, {customer: created});
      })
      .catch((fail: any) => {
        console.error(fail);
        res.send(400, fail);
      });
  }

  public search(req: any, res: restify.Response): void{
    service.search(req.body)
      .then((customers: Customer[]) => {
        res.send(200, {customers: customers});
      })
      .catch((fail: any) => {
        console.error(fail);
        res.send(400, fail);
      });
  }

  public list(req: any, res: restify.Response): void{
    service.list()
      .then((customers: Customer[]) => {
        res.send(200, {customers: customers});
      })
      .catch((fail: any) => {
        console.error(fail);
        res.send(400, fail);
      });
  }

  public get(req: any, res: restify.Response): void{
    service.find(req.params.id)
      .then((customer: Customer) => {
        if (customer === null) {
          res.send(404, "Not found");
          return;
        }

        res.send(200, {customer: customer});
      })
      .catch((fail: any) => {
        console.error(fail);
        res.send(400, fail);
      });
  }

  public update(req: any, res: restify.Response): void{
    var model = <Customer> req.body;
    model.id = req.params.id;
    service.update(model)
      .then((updated: Customer) => {
        res.send(200, {customer: updated});
      })
      .catch((fail: any) => {
        console.error(fail);
        res.send(400, fail);
      });
  }

  public destroy(req: any, res: restify.Response): void{
    service.destroy(req.params.id)
      .then((destroyed: Customer) => {
        res.send(200, {customer: destroyed});
      })
      .catch((fail: any) => {
        console.error(fail);
        res.send(400, fail);
      });
  }
}