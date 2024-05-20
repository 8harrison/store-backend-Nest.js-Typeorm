import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chat.entity';
import { Deal } from 'src/people/entities/deal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async createChat(dealId: number) {
    const deal = await this.dealRepository.findOne({
      where: { id: dealId },
      relations: { chat: true },
    });
    const chat = new Chat({});
    deal.chat = chat;
    return this.dealRepository.save(deal);
  }
}
