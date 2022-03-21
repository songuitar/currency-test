import { Injectable } from '@nestjs/common';
import { Donation, DonationDocument } from '../schemas/donation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IsEnum, IsPositive } from 'class-validator';

enum Currencies {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  RUB = 'RUB',
}

export class DonationDTO {
  @IsPositive()
  amount: number;

  @IsEnum(Currencies)
  currency: string;
}

@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<DonationDocument>,
  ) {}

  async create(data: DonationDTO): Promise<Donation> {
    const model = new this.donationModel(data);
    return model.save();
  }
}
