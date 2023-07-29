export class TmdbmovieDetailDtoModel {
    adult!: boolean
    backdrop_path!: string
    belongs_to_collection!: any
    budget!: number
    genres!: Genre[]
    homepage!: string
    id!: number
    imdb_id!: string
    original_language!: string
    original_title!: string
    overview!: string
    popularity!: number
    poster_path!: string
    production_companies!: ProductionCompany[]
    production_countries!: ProductionCountry[]
    release_date!: string
    revenue!: number
    runtime!: number
    spoken_languages!: SpokenLanguage[]
    status!: string
    tagline!: string
    title!: string
    video!: boolean
    vote_average!: number
    vote_count!: number
    credits!: Credits

    constructor(movieFromTmdbApi: any) {
        this.adult = movieFromTmdbApi.adult
        this.backdrop_path = movieFromTmdbApi.backdrop_path
        this.belongs_to_collection = movieFromTmdbApi.belongs_to_collection
        this.budget = movieFromTmdbApi.budget
        this.genres = movieFromTmdbApi.genres
        this.homepage = movieFromTmdbApi.homepage
        this.id = movieFromTmdbApi.id
        this.imdb_id = movieFromTmdbApi.imdb_id
        this.original_language = movieFromTmdbApi.original_language
        this.original_title = movieFromTmdbApi.original_title
        this.overview = movieFromTmdbApi.overview
        this.popularity = movieFromTmdbApi.popularity
        this.poster_path = movieFromTmdbApi.poster_path
        this.production_companies = movieFromTmdbApi.production_companies
        this.production_countries = movieFromTmdbApi.production_countries
        this.release_date = movieFromTmdbApi.release_date
        this.revenue = movieFromTmdbApi.revenue
        this.runtime = movieFromTmdbApi.runtime
        this.spoken_languages = movieFromTmdbApi.spoken_languages
        this.status = movieFromTmdbApi.status
        this.tagline = movieFromTmdbApi.tagline
        this.title = movieFromTmdbApi.title
        this.video = movieFromTmdbApi.video
        this.vote_average = movieFromTmdbApi.vote_average
        this.vote_count = movieFromTmdbApi.vote_count
        this.credits = movieFromTmdbApi.credits
    }

  }
  
  interface Genre {
    id: number
    name: string
  }
  
  interface ProductionCompany {
    id: number
    logo_path: any
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
    profile_path?: string
    cast_id: number
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
    profile_path: string
    credit_id: string
    department: string
    job: string
  }
  