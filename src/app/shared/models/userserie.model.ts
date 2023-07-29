import { SerieModel } from "./serie.model";
import { UserModel } from "./user.model";
import { UserseasonModel } from "./userseason.model";

export class UserserieModel {
    id!: number;
    serie!: SerieModel;
    status!: string;
    userRating!: number;
    statusDate!: Date;
    user!: UserModel;
    userSeasons!: UserseasonModel[];

    constructor(userSerie: any) {
        this.id = userSerie.id;
        this.serie = new SerieModel(userSerie.serie);
        this.status = userSerie.status;
        this.userRating = userSerie.userRating;
        this.statusDate = userSerie.statusDate;
        this.user = userSerie.user;
        this.userSeasons = [];
        for (let season of userSerie.userSeasons) {
            let seasonModel = new UserseasonModel(season);
            this.userSeasons.push(seasonModel);
        }
    }


}
