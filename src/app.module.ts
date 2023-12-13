import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlService } from './url/url.service';
import { UrlController } from './url/url.controller';

@Module({
  controllers: [AppController, UrlController],
  providers: [AppService, UrlService], // Include PrismaService as a provider
})
export class AppModule {}
