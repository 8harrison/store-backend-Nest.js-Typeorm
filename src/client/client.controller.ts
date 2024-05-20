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
import { CreatePurchaseDto } from '../people/dto/create-purchase.dto';
import { ResponseMessage } from '../response.message';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

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
}
