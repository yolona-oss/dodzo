import { Controller, Get, Put, Query, Res, Delete, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { ParseObjectIdPipe } from './../common/pipes/parse-object-id.pipe';
import { CreateOrgDto } from './dto/create-org.dto';

import { OrgService } from './org.service';

@Controller()
export class OrgController {
    constructor(
        private readonly orgService: OrgService
    ) {}

    @Get('/')
    async findAny(
        @Query() query: any,
        @Res() res: Response
    ) {
        if (query.id) {
            const doc = await this.orgService.findById(query.id)
            res.status(200).json(doc)
        } else if (query.name) {
            const doc = await this.orgService.findByName(query.name)
            res.status(200).json(doc)
        } else {
            const docs = await this.orgService.findAll()
            res.status(200).json(docs)
        }
    }

    @Post('/create')
    async create(
        @Body() createOrgDto: CreateOrgDto,
        @Res() res: Response
    ) {
        const doc = await this.orgService.create(createOrgDto)
        res.status(201).json(doc)
    }

    @Delete('/remove')
    async remove(
        @Query('id') id: string,
        @Res() res: Response
    ) {
        const doc = await this.orgService.remove(id)
        res.status(200).json(doc)
    }

    @Put('/change-address')
    async changeAddress(
        @Query('id') id: string,
        @Body() address: {
            lat: number,
            lng: number,
            address: string
        },
        @Res() res: Response
    ) {
        const doc = await this.orgService.changeAddress(id, address)
        res.status(200).json(doc)
    }

}
