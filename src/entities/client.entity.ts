import { AbstractEntity } from './abstract.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Person } from './person.entity';
import { Purchase } from './purchase.entity';

@Entity()
export class Client extends AbstractEntity<Client> {
  @OneToOne(() => Person, { cascade: true })
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @OneToMany(() => Purchase, (purchase) => purchase.client, { cascade: true })
  purchases: Purchase[];
}
