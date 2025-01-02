import { Controller, Get, Put, Query, Res, Delete, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { ParseObjectIdPipe } from './../../common/pipes/parse-object-id.pipe';
import { CreateOrgDto } from './dto/create-org.dto';

import { OrganizationService } from './organization.service';

@Controller()
export class OrganizationController {
    constructor(
        private readonly organizationService: OrganizationService
    ) {}

    @Get('/')
    async findAny(
        @Query() query: any,
        @Res() res: Response
    ) {
        if (query.id) {
            const doc = await this.organizationService.findById(query.id)
            res.status(200).json(doc)
        } else if (query.name) {
            const doc = await this.organizationService.findByName(query.name)
            res.status(200).json(doc)
        } else {
            const docs = await this.organizationService.findAll()
            res.status(200).json(docs)
        }
    }

    @Post('/create')
    async create(
        @Body() createOrgDto: CreateOrgDto,
        @Res() res: Response
    ) {
        const doc = await this.organizationService.create(createOrgDto)
        res.status(201).json(doc)
    }

    @Delete('/remove')
    async remove(
        @Query('id') id: string,
        @Res() res: Response
    ) {
        const doc = await this.organizationService.remove(id)
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
        const doc = await this.organizationService.changeAddress(id, address)
        res.status(200).json(doc)
    }

}
