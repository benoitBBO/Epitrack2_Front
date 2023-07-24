import { SeasonModel } from "./season.model";
import { UserModel } from "./user.model";
import { UserepisodeModel } from "./userepisode.model";

export class UserseasonModel {
    season!: SeasonModel;
    userEpisodes!: UserepisodeModel;
    status!: string;
    statusDate!: Date;
    user!: UserModel;

    constructor(userSeason: any) {
        this.season = new SeasonModel(userSeason.season);
        this.userEpisodes = new UserepisodeModel(userSeason.userEpisodes);
        this.status = userSeason.status;
        this.statusDate = userSeason.statusDate;
        this.user = new UserModel(userSeason.user);
    }
}
