import { CitiesService } from "./cities.service";
export declare class CitiesController {
    private citiesService;
    constructor(citiesService: CitiesService);
    getAllCities(): Promise<import("./dto/cities.dto").dtoCity[]>;
}
