import { EpisodeModel } from "./episode.model";
import { UserModel } from "./user.model";

export class UserepisodeModel {
    episode!: EpisodeModel;
    status!: string;
    statusDate!: Date;
    user!: UserModel;

    constructor(episode: any) {
        this.episode = new EpisodeModel(episode);
        this.status = episode.status;
        this.statusDate = episode.statusDate;
        this.user = new UserModel(episode.user);
    }
}
