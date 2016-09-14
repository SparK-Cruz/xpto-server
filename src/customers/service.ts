import { Customer } from './customer';
import { CustomerFilter } from './customer-filter';

export class CustomerService{
  public create(customer: Customer): Promise<Customer>{
    return Customer.Dao.create(customer)
      .then((result: Customer) => {
        customer.id = result.id;
        return customer;
      });;
  }

  public search(filter: CustomerFilter): Promise<Customer[]>{
    filter.search = '%'+(filter.search || '').trim()+'%';

    filter.birthMin = new Date(<any> filter.birthMin || "0001-01-01");
    filter.birthMax = new Date(<any> filter.birthMax || "9999-12-31");

    filter.birthMax.setUTCHours(23);
    filter.birthMax.setUTCMinutes(59);

    return Customer.Dao.findAll({
      where: {
        $or: [
          { name: { $like: filter.search }},
          { federalId: { $like: filter.search }},
          { email: { $like: filter.search }}
        ],
        birth: {
          $gte: filter.birthMin,
          $lte: filter.birthMax
        }
      }
    });
  }

  public list(): Promise<Customer[]>{
    return Customer.Dao.all();
  }

  public find(id: number): Promise<Customer>{
    return Customer.Dao.findById(id);
  }

  public update(customer: Customer): Promise<Customer>{
    return Customer.Dao.update(customer, {where: {id: customer.id}})
      .then(() => {
        return customer;
      });
  }

  public destroy(id: number): Promise<Customer>{
    var self = this;
    return self.find(id)
      .then((customer: Customer) => {
        return Customer.Dao.update({enabled: false}, {where: {id: id}, fields: ['enabled']})
          .then(() => {
            return customer;
          });
      });
  }
}