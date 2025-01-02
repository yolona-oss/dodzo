import { ISchedule } from "./../../common/types/schedule.type";

export interface CreateOrgDto {
    label: string;
    address: string
    schedule: ISchedule
}
