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

export class MovieModel {
    id!: number;
    title!: string;
    overview!: string;
    release_date!: string;
    rating!: number;
    image_landscape!: string;
    image_portrait!: string;
    genres!: Genre[];
    actors!: Actor[];
    imdb_ref!:string;
    type:string = "Movie";

    constructor(movieFromApi: any) {
        this.id = movieFromApi.id;
        this.title = movieFromApi.title;
        this.overview = movieFromApi.overview;
        this.release_date = movieFromApi.releaseDate;
        this.rating = movieFromApi.ratingAverage;
        this.image_landscape = movieFromApi.imageLandscapeUrl;
        this.image_portrait = movieFromApi.imagePosterUrl;
        this.genres = movieFromApi.genres;
        this.actors = movieFromApi.actors;
        this.imdb_ref = movieFromApi.imdbRef;
    }
}

