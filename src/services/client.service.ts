import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { Client } from '../entities/client.entity';
import { Offer } from '../entities/offer.entity';
import { Purchase } from '../entities/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async createPurchase(clientId: number, createPurchaseDto: CreatePurchaseDto) {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: { purchases: true },
    });
    const purchase = new Purchase(createPurchaseDto);
    client.purchases.push(purchase);
    return this.clientRepository.save(client);
  }

  async findAllPurchasesByClientId(clientId: number) {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: { purchases: true },
    });
    return client;
  }

  async updatePurchase(
    clientId: number,
    purchaseId: number,
    updatePurchaseDto: CreatePurchaseDto,
  ) {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: { purchases: true },
    });
    const purchases = client.purchases.map((el) => {
      if (el.id === purchaseId) {
        const purchase = new Purchase(updatePurchaseDto);
        purchase.id = purchaseId;
        return purchase;
      }
      return el;
    });

    client.purchases = purchases;
    return this.clientRepository.save(client);
  }

  async removePurchase(clientId: number, purchaseId: number) {
    await this.purchaseRepository.delete({ id: purchaseId });
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: { purchases: true },
    });
    return client;
  }

  async findAllOffersByPurchaseId(clientId: number, purchasId: number) {
    await this.clientRepository.findOneBy({ id: clientId });
    const purchase = await this.purchaseRepository.findOne({
      where: { id: purchasId },
      relations: { offers: true },
    });

    const offers = purchase.offers.map(
      async (el) =>
        await this.offerRepository.findOne({
          where: { id: el.id },
          relations: { craftsman: true },
        }),
    );
    purchase.offers = await Promise.all(offers);
    return purchase;
  }
}
