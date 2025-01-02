import { Coordinates } from "./../../types/address.type"

export interface CreateAddressDto {
    coordinates: Coordinates
    address: string
    label: string
}
