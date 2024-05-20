import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from './people/people.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './people/entities/person.entity';
import { PeopleController } from './people/people.controller';
import { PeopleService } from './people/people.service';
import { Address } from './address/address.entity';
import { Client } from './people/entities/client.entity';
import { Craftsman } from './people/entities/craftsman.entity';
import { Purchase } from './people/entities/purchase.entity';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { Offer } from './people/entities/offer.entity';
import { CraftsmanController } from './craftsman/craftsman.controller';
import { CraftsmanService } from './craftsman/craftsman.service';
import { Deal } from './people/entities/deal.entity';
import { PurchaseService } from './purchase/purchase.service';
import { PurchaseController } from './purchase/purchase.controller';
import { Chat } from './entities/chat.entity';
import { PeopleMiddleware } from './middlewares/people.middleware';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PeopleModule,
    TypeOrmModule.forFeature([
      Person,
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
    PeopleController,
    ClientController,
    CraftsmanController,
    PurchaseController,
  ],
  providers: [
    AppService,
    PeopleService,
    ClientService,
    CraftsmanService,
    PurchaseService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PeopleMiddleware)
      .exclude({ path: 'people', method: RequestMethod.GET })
      .forRoutes(PeopleController);
  }
}
