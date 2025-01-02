/*
 * On editing this file, please make sure to add edits in emploeers schedule and schedule schema
 */

export const WeekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
export type DayOfWeekType = typeof WeekDays[number];

export interface IWeekCut {
    from: DayOfWeekType
    to: DayOfWeekType
}

export type WeekCutsType = IWeekCut[]
export type WeekDaysType = DayOfWeekType[]
