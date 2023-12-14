import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { generateUniqueRandomString } from 'uniqstr';

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
    const newShortUrl = this.generateShortUrl(originalUrl);

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

  private generateShortUrl(originalUrl: string): string {
    // using uniqstr for short unique string generator
    // Generate a random number between 5 and 9 (inclusive)
    const randomNumber = Math.floor(Math.random() * (7 - 5 + 1)) + 5;

    // Round the random number
    const roundedNumber = Math.round(randomNumber);
    return generateUniqueRandomString(originalUrl, roundedNumber);
  }
}
