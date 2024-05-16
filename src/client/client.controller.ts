import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreatePurchaseDto } from 'src/people/dto/create-purchase.dto';
import { ResponseMessage } from 'src/response.message';
import { PurchaseService } from 'src/purchase/purchase.service';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly purchaseService: PurchaseService,
  ) {}

  @Post(':clientId/purchase')
  async createPurchase(
    @Param('clientId') clientId: string,
    @Body() createPurchaseDto: CreatePurchaseDto,
  ) {
    const client = await this.clientService.createPurchase(
      +clientId,
      createPurchaseDto,
    );
    return new ResponseMessage('Success', client);
  }

  @Get(':clientId/purchase')
  async findAllPurchasesByClientId(@Param('clientId') clientId: string) {
    const client =
      await this.clientService.findAllPurchasesByClientId(+clientId);
    return new ResponseMessage('Success', client);
  }

  @Patch(':clientId/purchase/:purchaseId')
  async updatePurchase(
    @Param('clientId') clientId: string,
    @Param('purchaseId') purchaseId: string,
    @Body() updatePurchaseDto: CreatePurchaseDto,
  ) {
    const client = await this.clientService.updatePurchase(
      +clientId,
      +purchaseId,
      updatePurchaseDto,
    );
    return new ResponseMessage('Success', client);
  }

  @Delete(':clientId/purchase/:purchaseId')
  async removePurchase(
    @Param('clientId') clientId: string,
    @Param('purchaseId') purchaseId: string,
  ) {
    const client = await this.clientService.removePurchase(
      +clientId,
      +purchaseId,
    );
    return new ResponseMessage('Success', client);
  }

  @Get(':clientId/purchase/:purchaseId/offer')
  async findAllOffersByPurchaseId(
    @Param('clientId') clientId: string,
    @Param('purchaseId') purchaseId: string,
  ) {
    const purchase = await this.clientService.findAllOffersByPurchaseId(
      +clientId,
      +purchaseId,
    );
    return new ResponseMessage('Success', purchase);
  }

  @Post(':clientId/purchase/:purchaseId/craftsman/:craftsmanId/offer/:offerId')
  async createDeal(
    @Param('clientId') clientId: string,
    @Param('purchaseId') purchaseId: string,
    @Param('craftsmanId') craftsmanId: string,
    @Param('offerId') offerId: string,
  ) {
    const deal = await this.purchaseService.createDeal(
      +purchaseId,
      +clientId,
      +craftsmanId,
      +offerId,
    );
    return new ResponseMessage('Success', deal);
  }
}
