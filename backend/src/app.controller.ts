import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { DonationDTO, DonationService } from './service/donation.service';
import { Donation } from './schemas/donation.schema';
import { ResponseInterceptor } from './interceptor/response.interceptor';

@Controller()
export class AppController {
  constructor(private readonly donationService: DonationService) {}

  @UseInterceptors(ResponseInterceptor)
  @Post('donate')
  saveDonation(@Body() data: DonationDTO): Promise<Donation> {
    return this.donationService.create(data);
  }
}
