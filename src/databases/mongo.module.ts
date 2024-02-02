import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ConfigKey from './configkey';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: configService.get<string>(
                        ConfigKey.CONNECTION_STRING,
                    ),
                };
            },
        }),
    ],
    providers: [],
})
export class MongoModule {}
