import { ISchedule } from "./../../../common/types/schedule.type"

export interface CreateEmploeerDto {
    user: string
    organization: string
    schedule: ISchedule
}
