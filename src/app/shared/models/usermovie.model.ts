import { MovieModel } from "./movie.model";
import { UserModel } from "./user.model";

export class UsermovieModel {
    id!: number;
    movie!: MovieModel;
    status!: string;
    userRating!: number;
    statusDate!: Date;
    user!:UserModel;

    constructor(userMovie: any) {
        this.id = userMovie.id;
        this.movie = new MovieModel(userMovie.movie);
        this.status = userMovie.status;
        this.userRating = userMovie.userRating;
        this.statusDate = userMovie.statusDate;
        this.user = new UserModel(userMovie.user)
    }
}
