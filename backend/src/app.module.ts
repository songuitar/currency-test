import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DonationService } from './service/donation.service';
import { Donation, DonationSchema } from './schemas/donation.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/currency-test'),
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [DonationService],
})
export class AppModule {}
