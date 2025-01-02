import { Controller, Get, Put, Query, Res, Delete, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { ParseObjectIdPipe } from './../../common/pipes/parse-object-id.pipe';
import { CreateEmploeerDto } from './dto/create-emploeer.dto';

import { EmploeersService } from './emploeers.service';

@Controller()
export class EmploeersController {
    constructor(
        private readonly emploeersService: EmploeersService
    ) {}

    async findAll(@Res() res: Response) {
        const docs = await this.emploeersService.findAll()
        res.status(200).json(docs)
    }

    @Get('/get-by-doc')
    async findById(
        @Query('id') id: string,
        @Res() res: Response
    ) {
        const doc = await this.emploeersService.findById(id)
        res.status(200).json(doc)
    }

    @Get('/get-by-user')
    async findByUser(
        @Query('id', ParseObjectIdPipe) id: string,
        @Res() res: Response
    ) {
        const doc = await this.emploeersService.findByUser(id)
        res.status(200).json(doc)
    }

    @Get('/get-all-from-org')
    async findAllByOrg(
        @Query('id', ParseObjectIdPipe) id: string,
        @Res() res: Response
    ) {
        const docs = await this.emploeersService.findByOrg(id)
        res.status(200).json(docs)
    }

    @Post('/create')
    async create(
        @Body() createEmploeerDto: CreateEmploeerDto,
        @Res() res: Response
    ) {
        const doc = await this.emploeersService.create(createEmploeerDto)
        res.status(201).json(doc)
    }

    @Put('/assign-org')
    async asingOrgByUser(
        @Query('id', ParseObjectIdPipe) id: string,
        @Query('orgId', ParseObjectIdPipe) orgId: string,
        @Res() res: Response
    ) {
        const doc = await this.emploeersService.asignOrgByUser(id, orgId)
        res.status(200).json(doc)
    }

    @Put('/assign-schedule')
    async asignSchedule(
        @Query('id', ParseObjectIdPipe) id: string,
        @Query('schedule') schedule: any,
        @Res() res: Response
    ) {
        const doc = await this.emploeersService.asignScheduleByUser(id, schedule)
        res.status(200).json(doc)
    }

    @Delete('/remove')
    async remove(
        @Query('id', ParseObjectIdPipe) id: string,
        @Res() res: Response
    ) {
        const doc = await this.emploeersService.remove(id)
        res.status(200).json(doc)
    }

}
