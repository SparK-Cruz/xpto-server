import { Customer } from './customer';
import { CustomerFilter } from './customer-filter';
export declare class CustomerService {
    create(customer: Customer): Promise<Customer>;
    search(filter: CustomerFilter): Promise<Customer[]>;
    list(): Promise<Customer[]>;
    find(id: number): Promise<Customer>;
    update(customer: Customer): Promise<Customer>;
    destroy(id: number): Promise<Customer>;
}
