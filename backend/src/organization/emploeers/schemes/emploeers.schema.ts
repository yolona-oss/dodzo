import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { WeekDays } from './../../../common/types/week.type';
import { ISchedule } from './../../../common/types/schedule.type';

export type EmploeerDocument = EmploeerEntity & Document;

const WeekSubSchema = new mongoose.Schema({
    value: { type: String, enum: WeekDays, required: true }
})

@Schema({
    toJSON: {
        virtuals: true,
    }
})
export class EmploeerEntity {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true})
    user: mongoose.Schema.Types.ObjectId

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true})
    organization: mongoose.Schema.Types.ObjectId

    @Prop({type: {
        weekDays: {
            type: [WeekSubSchema],
        },
        workHours: {
            start: {type: Number, required: true},
            count: {type: Number, required: true}
        }
    }, required: true})
    schedule: ISchedule
}

export const EmploeerSchema = SchemaFactory.createForClass(EmploeerEntity);
