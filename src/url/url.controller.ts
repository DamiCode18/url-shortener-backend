// src/url/url.controller.ts
import {
  Controller,
  Post,
  Body,
  Redirect,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async createUrl(@Body() body: { originalUrl: string }) {
    const { originalUrl } = body;
    const shortUrl = await this.urlService.createUrl(originalUrl);
    return { originalUrl, shortUrl };
  }

  @Get('allUrls')
  async getAllUrls() {
    const urls = await this.urlService.getAllUrls();
    return { urls };
  }

  // @Redirect(':shorten', 301)
  @Get(':shorten')
  @Redirect()
  async redirectToOriginalUrl(@Param('shorten') shortUrl: string) {
    const originalUrl = await this.urlService.findOriginalUrl(shortUrl);
    if (!originalUrl) {
      throw new NotFoundException('URL not found');
    }
    return { url: originalUrl || '/' };
  }
}
