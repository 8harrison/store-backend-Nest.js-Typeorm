import { AbstractEntity } from '../../abstract.entity';
import { Offer } from './offer.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Chat } from '../../entities/chat.entity';

@Entity()
export class Deal extends AbstractEntity<Deal> {
  @OneToOne(() => Offer, { cascade: true })
  @JoinColumn({ name: 'offer_id' })
  offer: Offer;
  @OneToOne(() => Purchase, { cascade: true })
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;
  @Column({ default: true })
  doing: boolean;
  @Column({ default: false })
  transporting: boolean;
  @Column({ default: false })
  delivered: boolean;
  @OneToOne(() => Chat, (chat) => chat.deal)
  chat: Chat;
}
