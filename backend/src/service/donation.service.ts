import { Injectable } from '@nestjs/common';
import { Donation, DonationDocument } from '../schemas/donation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface DonationDTO {
  amount: number;
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
