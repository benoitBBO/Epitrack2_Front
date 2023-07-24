import { TmdbseasonDetailDtoModel } from "./tmdbseason-detail-dto.model"

export class TmdbserieDetailDtoModel {
    adult!: boolean
    backdrop_path!: string
    created_by!: CreatedBy[]
    episode_run_time!: number[]
    first_air_date!: string
    genres!: Genre[]
    homepage!: string
    id!: number
    in_production!: boolean
    languages!: string[]
    last_air_date!: string
    last_episode_to_air!: LastEpisodeToAir
    name!: string
    next_episode_to_air!: any
    networks!: Network[]
    number_of_episodes!: number
    number_of_seasons!: number
    origin_country!: string[]
    original_language!: string
    original_name!: string
    overview!: string
    popularity!: number
    poster_path!: string
    production_companies!: ProductionCompany[]
    production_countries!: ProductionCountry[]
    seasons!: TmdbseasonDetailDtoModel[]
    spoken_languages!: SpokenLanguage[]
    status!: string
    tagline!: string
    type!: string
    vote_average!: number
    vote_count!: number
    credits!: Credits

    constructor(serieFromTmdbApi: any) {
        this.adult = serieFromTmdbApi.adult;
        this.backdrop_path = serieFromTmdbApi.backdrop_path;
        this.created_by = serieFromTmdbApi.created_by;
        this.episode_run_time = serieFromTmdbApi.episode_run_time;
        this.first_air_date = serieFromTmdbApi.first_air_date;
        this.genres = serieFromTmdbApi.genres;
        this.homepage = serieFromTmdbApi.homepage;
        this.id = serieFromTmdbApi.id;
        this.in_production = serieFromTmdbApi.in_production;
        this.languages = serieFromTmdbApi.languages;
        this.last_air_date = serieFromTmdbApi.last_air_date;
        this.last_episode_to_air = serieFromTmdbApi.last_episode_to_air;
        this.name = serieFromTmdbApi.name;
        this.next_episode_to_air = serieFromTmdbApi.next_episode_to_air;
        this.networks = serieFromTmdbApi.networks;
        this.number_of_episodes = serieFromTmdbApi.number_of_episodes;
        this.number_of_seasons = serieFromTmdbApi.number_of_seasons;
        this.origin_country = serieFromTmdbApi.origin_country;
        this.original_language = serieFromTmdbApi.original_language;
        this.original_name = serieFromTmdbApi.original_name;
        this.overview = serieFromTmdbApi.overview;
        this.popularity = serieFromTmdbApi.popularity;
        this.poster_path = serieFromTmdbApi.poster_path;
        this.production_companies = serieFromTmdbApi.production_companies;
        this.production_countries = serieFromTmdbApi.production_countries;
        this.seasons = serieFromTmdbApi.seasons;
        this.spoken_languages = serieFromTmdbApi.spoken_languages;
        this.status = serieFromTmdbApi.status;
        this.tagline = serieFromTmdbApi.tagline;
        this.type = serieFromTmdbApi.type;
        this.vote_average = serieFromTmdbApi.vote_average;
        this.vote_count = serieFromTmdbApi.vote_count;
        this.credits = serieFromTmdbApi.credits;
    }
}


interface CreatedBy {
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: any
  }
  
  interface Genre {
    id: number
    name: string
  }
  
  interface LastEpisodeToAir {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
  }
  
  interface Network {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }
  
  interface ProductionCompany {
    id: number
    logo_path?: string
    name: string
    origin_country: string
  }
  
  interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
   
  interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
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
  