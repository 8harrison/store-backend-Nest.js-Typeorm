import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/people/entities/client.entity';
import { Craftsman } from 'src/people/entities/craftsman.entity';
import { Deal } from 'src/people/entities/deal.entity';
import { Offer } from 'src/people/entities/offer.entity';
import { Purchase } from 'src/people/entities/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Craftsman)
    private readonly craftsmanRepository: Repository<Craftsman>,
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
  ) {}

  async createDeal(
    purchaseId: number,
    clientId: number,
    craftsmaId: number,
    offerId: number,
  ) {
    const purchase = await this.purchaseRepository.findOneBy({
      id: purchaseId,
    });
    const client = await this.clientRepository.findOneBy({ id: clientId });
    const craftsman = await this.craftsmanRepository.findOneBy({
      id: craftsmaId,
    });
    const offer = await this.offerRepository.findOneBy({ id: offerId });
    const deal = new Deal({});
    deal.client = client;
    deal.purchase = purchase;
    deal.craftsman = craftsman;
    deal.offer = offer;
    return this.dealRepository.save(deal);
  }
}
