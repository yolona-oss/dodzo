import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmploeersService } from './emploeers.service';
import { EmploeersController } from './emploeers.controller';

import { EmploeerSchema } from './schemes/emploeers.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Emploeer', schema: EmploeerSchema }
        ]),
    ],
    providers: [EmploeersService],
    controllers: [EmploeersController],
    exports: [EmploeersService]
})
export class EmploeersModule { }
