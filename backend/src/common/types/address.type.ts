export interface Coordinates {
    lat: number
    lng: number
}

export interface Address {
    coordinates: Coordinates
    address: string
}
