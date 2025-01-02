import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmploeersService } from './emploeers.service';
import { EmploeersController } from './emploeers.controller';

import { EmploeerEntity } from './schemes/emploeers.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Emploeer', schema: EmploeerEntity }
        ]),
    ],
    providers: [EmploeersService],
    controllers: [EmploeersController],
    exports: [EmploeersService]
})
export class EmploeersModule { }
