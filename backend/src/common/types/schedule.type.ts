import { IWorkHours } from "./work-hours.type";
import { WeekDaysType } from "./week.type";

export interface ISchedule {
    weekDays: WeekDaysType[],
    workHours: IWorkHours
}
