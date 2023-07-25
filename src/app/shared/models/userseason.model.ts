import { SeasonModel } from "./season.model";
import { UserModel } from "./user.model";
import { UserepisodeModel } from "./userepisode.model";

export class UserseasonModel {
    id!:number;
    season!: SeasonModel;
    userEpisodes!: UserepisodeModel[];
    status!: string;
    statusDate!: Date;
    user!: UserModel;

    constructor(userSeason: any) {
        this.id = userSeason.id;
        this.season = new SeasonModel(userSeason.season);
        this.userEpisodes = [];
        for (let episode of userSeason.userEpisodes) {
            let episodeModel = new UserepisodeModel(episode);
            this.userEpisodes.push(episodeModel);
        }
        this.status = userSeason.status;
        this.statusDate = userSeason.statusDate;
        this.user = userSeason.user;
    }
}
