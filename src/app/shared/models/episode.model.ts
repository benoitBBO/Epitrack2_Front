export class EpisodeModel {
    id!: number;
    title!:string;
    imageUrl!:string;
    airDate!: Date;

    constructor(episode:any){
        this.id = episode.id;
        this.title = episode.title;
        this.imageUrl = episode.imageUrl;
        this.airDate = episode.airDate;
    }
}
