import { MovieModel } from "./movie.model";

export class UsermovieModel {
    id!: number;
    movie!: MovieModel;
    status!: string;
    userRating!: number;
    statusDate!: Date;

    constructor(user: any) {
        this.id = user.id;
        this.movie = user.movie;
        this.status = user.status;
        this.userRating = user.userRating;
        this.statusDate = user.statusDate;
    }
}
