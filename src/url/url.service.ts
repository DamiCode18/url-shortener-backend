import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { init } from '@paralleldrive/cuid2';

@Injectable()
export class UrlService {
  createId = init({
    random: Math.random,
    length: 8,
  });
  async createUrl(originalUrl: string): Promise<string> {
    try {
      const createdUrl = await PrismaService.url.create({
        data: {
          originalUrl,
          shortUrl: this.createId(),
        },
      });

      return createdUrl.shortUrl;
    } catch (error) {
      console.error('Error creating URL:', error);
      throw error;
    }
  }

  async getAllUrls() {
    const urls = await PrismaService.url.findMany();
    return urls;
  }

  async findOriginalUrl(shortUrl: string): Promise<string | null> {
    const url = await PrismaService.url.findUnique({
      where: { shortUrl },
    });
    return url ? url.originalUrl : null;
  }
}
