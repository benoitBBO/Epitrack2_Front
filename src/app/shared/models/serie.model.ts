interface Genre {
    id: number;
    name:string;    
}

interface Actor {
    id: number;
    name:string;
    photo_url:string;
    tmdb_ref:string;
}

export class SerieModel {
    id!: number;
    title!: string;
    overview!: string;
    release_date!: Date;
    rating!: number;
    image_landscape!: string;
    image_portrait!: string;
    genres!: Genre[];
    actors!: Actor[];
    imdb_ref!:string;
    type:string = "Serie";

    constructor(serieFromApi: any) {
        this.id = serieFromApi.id;
        this.title = serieFromApi.title;
        this.overview = serieFromApi.overview;
        this.release_date = new Date(serieFromApi.releaseDate)
        this.rating = serieFromApi.rating;
        this.image_landscape = serieFromApi.imageLandscapeUrl;
        this.image_portrait = serieFromApi.imagePosterUrl;
        this.genres = serieFromApi.genres;
        this.actors = serieFromApi.actors;
        this.imdb_ref = serieFromApi.imdbRef;
    }
}

