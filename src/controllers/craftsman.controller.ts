import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CraftsmanService } from '../services/craftsman.service';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { ResponseMessage } from '../utils/response.message';

@Controller('craftsmen')
export class CraftsmanController {
  constructor(private readonly craftsmanService: CraftsmanService) {}

  @Post(':craftsmanId/purchase/:purchaseId/offer')
  async createOffer(
    @Param('craftsmanId') craftsmanId: string,
    @Param('purchaseId') purchaseId: string,
    @Body() createOfferDto: CreateOfferDto,
  ) {
    const offer = await this.craftsmanService.createOffer(
      +craftsmanId,
      +purchaseId,
      createOfferDto,
    );
    return new ResponseMessage('Success', offer);
  }

  @Get(':craftsmanId/offer')
  async findAllOffersByCraftsmanId(@Param('craftsmanId') craftsmanId: string) {
    const craftsman =
      await this.craftsmanService.findAllOffersByCraftsmanId(+craftsmanId);
    return new ResponseMessage('Success', craftsman);
  }

  @Patch(':craftsmanId/purchase/:purchaseId/offer/:offerId')
  async updateOffer(
    @Param('craftsmanId') craftsmanId: string,
    @Param('purchaseId') purchaseId: string,
    @Param('offerId') offerId: string,
    @Body() updateOfferDto: CreateOfferDto,
  ) {
    const offer = await this.craftsmanService.updateOffer(
      +craftsmanId,
      +purchaseId,
      +offerId,
      updateOfferDto,
    );
    return new ResponseMessage('Success', offer);
  }

  @Delete(':craftsmanId/offer/:offerId')
  async removeOffer(
    @Param('craftsmanId') craftsmanId: string,
    @Param('offerId') offerId: string,
  ) {
    const craftsman = await this.craftsmanService.removeOffer(
      +craftsmanId,
      +offerId,
    );
    return new ResponseMessage('Success', craftsman);
  }
}
