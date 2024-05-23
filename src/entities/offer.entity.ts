import { AbstractEntity } from './abstract.entity';
import { DecimalColumnTransform } from '../utils/decimalColumnTRansformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Craftsman } from './craftsman.entity';
import { Purchase } from './purchase.entity';
import { Deal } from './deal.entity';

@Entity()
export class Offer extends AbstractEntity<Offer> {
  @Column('decimal', {
    name: 'min_price',
    precision: 5,
    scale: 2,
    transformer: new DecimalColumnTransform(),
  })
  price: number;

  @Column()
  content: string;

  @ManyToOne(() => Craftsman, (craftsman) => craftsman.offers)
  @JoinColumn({name: 'craftsman_id'})
  craftsman: Craftsman;
  
  @ManyToOne(() => Purchase, (purchase) => purchase.offers)
  @JoinColumn({name: 'purchase_id'})
  purchase: Purchase;

  @OneToOne(() => Deal, (deal) => deal.offer) 
  deal: Deal
}
