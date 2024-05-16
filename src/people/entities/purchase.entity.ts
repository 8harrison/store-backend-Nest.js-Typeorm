import { AbstractEntity } from 'src/abstract.entity';
import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Client } from './client.entity';
import { DecimalColumnTransform } from 'src/utils/decimalColumnTRansformer';
import { Offer } from './offer.entity';
import { Deal } from './deal.entity';

@Entity()
export class Purchase extends AbstractEntity<Purchase> {
  @Column()
  title: string;
  @Column()
  description: string;
  @Column('decimal', {
    name: 'min_price',
    precision: 5,
    scale: 2,
    transformer: new DecimalColumnTransform(),
  })
  minPrice: number;
  @Column('decimal', {
    name: 'max_price',
    precision: 5,
    scale: 2,
    transformer: new DecimalColumnTransform(),
  })
  maxPrice: number;
  @Column({ name: 'picture_link', default: '' })
  pictureLink: string;
  @ManyToOne(() => Client, (client) => client.purchases)
  @JoinColumn({name: 'client_id'})
  client: Client;

  @OneToMany(() => Offer, (offer) => offer.purchase, { cascade: true })
  offers: Offer[];

  @OneToOne(() => Deal, (deal) => deal.purchase)
  deal: Deal;
}
