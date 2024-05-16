import { AbstractEntity } from 'src/abstract.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Person } from './person.entity';
import { Offer } from './offer.entity';
import { Deal } from './deal.entity';

@Entity()
export class Craftsman extends AbstractEntity<Craftsman> {
  @Column()
  specialism: string;

  @OneToOne(() => Person, { cascade: true })
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @OneToMany(() => Offer, (offer) => offer.craftsman, { cascade: true })
  offers: Offer[];

  @OneToOne(() => Deal, (deal) => deal.craftsman)
  deal: Deal;
}
