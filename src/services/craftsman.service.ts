import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { Craftsman } from '../entities/craftsman.entity';
import { Offer } from '../entities/offer.entity';
import { Purchase } from '../entities/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CraftsmanService {
  constructor(
    @InjectRepository(Craftsman)
    private readonly craftsmanRepository: Repository<Craftsman>,
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async createOffer(
    craftsmanId: number,
    purchaseId: number,
    createOfferDto: CreateOfferDto,
  ) {
    const purchase = await this.purchaseRepository.findOneBy({
      id: purchaseId,
    });
    const craftsman = await this.craftsmanRepository.findOneBy({
      id: craftsmanId,
    });
    const offer = new Offer(createOfferDto);
    offer.purchase = purchase;
    offer.craftsman = craftsman;
    return this.offerRepository.save(offer);
  }

  async findAllOffersByCraftsmanId(craftsmanId: number) {
    const craftsman = await this.craftsmanRepository.findOne({
      where: { id: craftsmanId },
      relations: { offers: true },
    });
    const offers = craftsman.offers.map(
      async (el) =>
        await this.offerRepository.findOne({
          where: { id: el.id },
          relations: { purchase: true },
        }),
    );

    craftsman.offers = await Promise.all(offers);

    return craftsman;
  }

  async updateOffer(
    craftsmanId: number,
    purchaseId: number,
    offerId: number,
    updateOfferDto: CreateOfferDto,
  ) {
    await this.offerRepository.findOneBy({ id: offerId });
    const craftsman = await this.craftsmanRepository.findOneBy({
      id: craftsmanId,
    });
    const purchase = await this.purchaseRepository.findOneBy({
      id: purchaseId,
    });
    const offer = new Offer(updateOfferDto);
    offer.id = offerId;
    offer.craftsman = craftsman;
    offer.purchase = purchase;
    return this.offerRepository.save(offer);
  }

  async removeOffer(craftsmaId: number, offerId: number) {
    await this.offerRepository.delete({ id: offerId });
    const craftsman = await this.craftsmanRepository.findOne({
      where: { id: craftsmaId },
      relations: { offers: true },
    });
    return craftsman;
  }
}
