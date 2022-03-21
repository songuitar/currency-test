import { Body, Controller, Post } from '@nestjs/common';
import { Donation } from './schemas/donation.schema';
import { DonationDTO, DonationService } from './service/donation.service';

@Controller()
export class AppController {
  constructor(private readonly donationService: DonationService) {}

  @Post('donate')
  saveDonation(@Body() data: DonationDTO): Promise<Donation> {
    return this.donationService.create(data);
  }
}
