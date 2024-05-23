import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PurchaseService } from '../services/purchase.service';
import { ResponseMessage } from '../utils/response.message';
import { UpdateDealDto } from '../dto/update-deal.dto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post(':purchaseId/offer/:offerId/deal')
  async createDeal(
    @Param('purchaseId') purchaseId: string,
    @Param('offerId') offerId: string,
  ) {
    const deal = await this.purchaseService.createDeal(+purchaseId, +offerId);
    return new ResponseMessage('Success', deal);
  }

  @Get('deal/:dealId')
  async findDealById(@Param('dealId') dealId: string) {
    const deal = await this.purchaseService.findDealById(+dealId);
    return new ResponseMessage('Success', deal);
  }

  @Patch('deal/:dealId')
  async updateDeal(
    @Param('dealId') dealId: string,
    @Body() updateDealDto: UpdateDealDto,
  ) {
    const deal = await this.purchaseService.updateDeal(+dealId, updateDealDto);
    return new ResponseMessage('Success', deal);
  }

  @Delete('deal/:dealId')
  async removeDeal(@Param('dealId') dealId: string) {
    const message = await this.purchaseService.removeDeal(+dealId);
    return new ResponseMessage('Success', message);
  }
}
