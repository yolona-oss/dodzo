import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { WeekDays } from 'common/types/week.type';
import { ISchedule } from 'common/types/schedule.type';

export type OrgDocument = OrgEntity & Document;

const WeekSubSchema = new mongoose.Schema({
    value: { type: String, enum: WeekDays, required: true }
})

@Schema({
    toJSON: {
        virtuals: true,
    }
})
export class OrgEntity {
    @Prop({ type: String, required: true, unique: true })
    label: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'AddressBook', required: true})
    address: mongoose.Schema.Types.ObjectId

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

export const OrgSchema = SchemaFactory.createForClass(OrgEntity);
