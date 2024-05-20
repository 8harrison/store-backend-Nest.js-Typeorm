import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDealDto } from '../people/dto/update-deal.dto';
import { Deal } from '../people/entities/deal.entity';
import { Offer } from '../people/entities/offer.entity';
import { Purchase } from '../people/entities/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
  ) {}

  async createDeal(purchaseId: number, offerId: number) {
    const purchase = await this.purchaseRepository.findOne({
      where: { id: purchaseId },
      relations: { client: true },
    });
    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
      relations: { craftsman: true },
    });
    const deal = new Deal({});
    deal.purchase = purchase;
    deal.offer = offer;
    return this.dealRepository.save(deal);
  }

  async findDealById(dealId: number) {
    const deal = await this.dealRepository.findOne({
      where: { id: dealId },
      relations: { offer: true, purchase: true },
    });
    return deal;
  }

  async updateDeal(dealId: number, updateDealDto: UpdateDealDto) {
    const deal = await this.dealRepository.findOne({
      where: { id: dealId },
      relations: { purchase: true, offer: true },
    });
    deal.doing = updateDealDto.doing;
    deal.transporting = updateDealDto.transporting;
    deal.delivered = updateDealDto.delivered;
    return this.dealRepository.save(deal);
  }

  async removeDeal(dealId: number) {
    await this.dealRepository.delete(dealId);
    return 'Acordo excluído com sucesso!';
  }
}
