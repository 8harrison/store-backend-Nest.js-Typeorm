import { AbstractEntity } from '../abstract.entity';
import { Deal } from '../people/entities/deal.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Chat extends AbstractEntity<Chat> {
  @OneToOne(() => Deal, { cascade: true })
  @JoinColumn({ name: 'deal_id' })
  deal: Deal;
}
