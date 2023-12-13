// src/url/url.controller.ts
import { Controller, Post, Body, Redirect, Param, Get } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async createUrl(@Body() body: { originalUrl: string }) {
    const { originalUrl } = body;
    const shortUrl = await this.urlService.createUrl(originalUrl);
    return { originalUrl, shortUrl };
  }

  @Get()
  async getAllUrls() {
    const urls = await this.urlService.getAllUrls();
    return { urls };
  }

  @Redirect(':shortUrl', 301)
  @Post(':shortUrl')
  async redirectToOriginalUrl(@Param('shortUrl') shortUrl: string) {
    const originalUrl = await this.urlService.findOriginalUrl(shortUrl);
    return { url: originalUrl || '/' };
  }
}
