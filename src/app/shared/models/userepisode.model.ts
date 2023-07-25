import { EpisodeModel } from "./episode.model";
import { UserModel } from "./user.model";

export class UserepisodeModel {
    id!: number;
    episode!: EpisodeModel;
    status!: string;
    statusDate!: Date;
    user!: UserModel;

    constructor(userEpisode: any) {
        this.id = userEpisode.id;
        this.episode = userEpisode.episode;
        this.status = userEpisode.status;
        this.statusDate = userEpisode.statusDate;
        this.user = userEpisode.user;
    }
}
