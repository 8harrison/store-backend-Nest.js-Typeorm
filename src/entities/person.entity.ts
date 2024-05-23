import { AbstractEntity } from './abstract.entity';
import { Address } from './address.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Person extends AbstractEntity<Person> {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  cpf: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => Client, (client) => client.person)
  client: Client;
}
