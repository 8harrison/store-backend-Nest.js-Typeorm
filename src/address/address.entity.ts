import { AbstractEntity } from '../abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Address extends AbstractEntity<Address> {
  @Column()
  street: string;
  @Column()
  neighborhood: string;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column()
  cep: string;
  @Column({ name: 'address_number' })
  addressNumber: string;
}
