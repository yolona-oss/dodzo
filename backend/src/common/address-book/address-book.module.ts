import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddressBookService } from './address-book.service';
import { AddressBookEntity } from './schemes/address-book.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'AddressBook', schema: AddressBookEntity }
        ]),
    ],
    providers: [AddressBookService],
    exports: [AddressBookService]
})
export class AddressBookModule { }
