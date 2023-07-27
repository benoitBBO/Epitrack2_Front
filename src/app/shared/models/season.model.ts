import { EpisodeModel } from "./episode.model"

export class SeasonModel {
    id!: number
    title!: string
    seasonNumber!: number
    overview!: string
    imageUrl!: string
    airDate!: string
    episodes!: EpisodeModel[];

    constructor(season:any){
        this.id = season.id;
        this.title = season.title;
        this.seasonNumber = season.seasonNumber;
        this.overview = season.overview;
        this.imageUrl = season.imageUrl;
        this.airDate = season.airDate;
        this.episodes = season.episodes;
    }
}
