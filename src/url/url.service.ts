import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UrlService {
  // constructor(private readonly prisma: typeof PrismaService) {}

  async createUrl(originalUrl: string): Promise<string> {
    // Check if the original URL already exists
    const existingUrl = await PrismaService.url.findUnique({
      where: { originalUrl },
    });

    if (existingUrl) {
      // If the URL already exists, return the existing short URL
      return existingUrl.shortUrl;
    }

    // If the URL does not exist, generate a new short URL
    const newShortUrl = this.generateShortUrl();

    // Create the new URL in the database
    const createdUrl = await PrismaService.url.create({
      data: {
        originalUrl,
        shortUrl: newShortUrl,
      },
    });

    return createdUrl.shortUrl;
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

  private generateShortUrl(): string {
    // Add your custom logic to generate short URLs
    // For simplicity, you might use a library like shortid or generate a random string
    return Math.random().toString(36).substring(7);
  }
}
