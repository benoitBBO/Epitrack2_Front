import { SerieModel } from "./serie.model";
import { UserModel } from "./user.model";

export class UserserieModel {
    id!: number;
    serie!: SerieModel;
    status!: string;
    userRating!: number;
    statusDate!: Date;
    user!:UserModel;

    constructor(userSerie: any) {
        this.id = userSerie.id;
        this.serie = new SerieModel(userSerie.serie);
        this.status = userSerie.status;
        this.userRating = userSerie.userRating;
        this.statusDate = userSerie.statusDate;
        this.user = new UserModel(userSerie.user)
    }


}
