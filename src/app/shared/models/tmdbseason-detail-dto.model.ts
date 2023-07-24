import { TmdbepisodeDetailDtoModel } from "./tmdbepisode-detail-dto.model"

export class TmdbseasonDetailDtoModel {

    _id!: string
    air_date!: string
    episodes!: TmdbepisodeDetailDtoModel[]
    name!: string
    overview!: string
    id!: number
    poster_path!: string
    season_number!: number
    vote_average!: number
    credits!: Credits

    constructor(seasonFromTmdbApi:any) {
        this._id = seasonFromTmdbApi._id
        this.air_date = seasonFromTmdbApi._id
        this.episodes = seasonFromTmdbApi.episodes
        this.name = seasonFromTmdbApi.name
        this.overview = seasonFromTmdbApi.name
        this.id = seasonFromTmdbApi.id
        this.poster_path = seasonFromTmdbApi.poster_path
        this.season_number = seasonFromTmdbApi.season_number
        this.vote_average = seasonFromTmdbApi.vote_average
    }
}


interface Credits {
    cast: Cast[]
    crew: Crew[]
  }


  interface Cast {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    character: string
    credit_id: string
    order: number
  }
  
  interface Crew {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    credit_id: string
    department: string
    job: string
  }
  