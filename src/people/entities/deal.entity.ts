import { AbstractEntity } from 'src/abstract.entity';
import { Offer } from './offer.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Client } from './client.entity';
import { Craftsman } from './craftsman.entity';
import { Purchase } from './purchase.entity';

@Entity()
export class Deal extends AbstractEntity<Deal> {
  @OneToOne(() => Offer, { cascade: true })
  @JoinColumn({ name: 'offer_id' })
  offer: Offer;

  @OneToOne(() => Client, { cascade: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToOne(() => Craftsman, { cascade: true })
  @JoinColumn({ name: 'craftsman_id' })
  craftsman: Craftsman;

  @OneToOne(() => Purchase, { cascade: true })
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;
}
