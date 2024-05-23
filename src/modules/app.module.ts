import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from './people.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleController } from '../controllers/people.controller';
import { Address } from '../entities/address.entity';
import { Client } from '../entities/client.entity';
import { Craftsman } from '../entities/craftsman.entity';
import { Purchase } from '../entities/purchase.entity';
import { ClientController } from '../controllers/client.controller';
import { ClientService } from '../services/client.service';
import { Offer } from '../entities/offer.entity';
import { CraftsmanController } from '../controllers/craftsman.controller';
import { CraftsmanService } from '../services/craftsman.service';
import { Deal } from '../entities/deal.entity';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseController } from '../controllers/purchase.controller';
import { Chat } from '../entities/chat.entity';
import {
  addressMiddleware,
  craftsmanMiddleware,
  peopleMiddleware,
} from '../middlewares/middlewares';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PeopleModule,
    TypeOrmModule.forFeature([
      Address,
      Client,
      Craftsman,
      Purchase,
      Offer,
      Deal,
      Chat,
    ]),
  ],
  controllers: [
    AppController,
    ClientController,
    CraftsmanController,
    PurchaseController,
  ],
  providers: [AppService, ClientService, CraftsmanService, PurchaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(peopleMiddleware)
      .forRoutes(
        { path: 'people', method: RequestMethod.POST },
        { path: 'people/:id', method: RequestMethod.PATCH },
      );
    consumer
      .apply(addressMiddleware)
      .forRoutes(
        { path: 'people/:id/address', method: RequestMethod.POST },
        { path: 'people/:id/address/:addressId', method: RequestMethod.PATCH },
      );
    consumer.apply(craftsmanMiddleware).forRoutes(
      { path: 'people/:id/craftsmen', method: RequestMethod.POST },
      {
        path: 'people/:id/craftsmen/:craftsmanId',
        method: RequestMethod.PATCH,
      },
    );
  }
}
