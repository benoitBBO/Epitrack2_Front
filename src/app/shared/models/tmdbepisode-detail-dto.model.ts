export class TmdbepisodeDetailDtoModel {
        air_date!: string
        episode_number!: number
        id!: number
        name!: string
        overview!: string
        production_code!: string
        runtime!: number
        season_number!: number
        show_id!: number
        still_path!: string
        vote_average!: number
        vote_count!: number
        crew!: Crew[]
        guest_stars!: GuestStar[]
      
        constructor(episodeFromTmdbApi: any) {
            this.air_date = episodeFromTmdbApi.air_date
            this.episode_number = episodeFromTmdbApi.episode_number
            this.id = episodeFromTmdbApi.id
            this.name = episodeFromTmdbApi.name
            this.overview = episodeFromTmdbApi.overview
            this.production_code = episodeFromTmdbApi.production_code
            this.runtime = episodeFromTmdbApi.runtime
            this.season_number = episodeFromTmdbApi.season_number
            this.show_id = episodeFromTmdbApi.show_id
            this.still_path = episodeFromTmdbApi.still_path
            this.vote_average = episodeFromTmdbApi.vote_average
            this.vote_count = episodeFromTmdbApi.vote_count
            this.crew = episodeFromTmdbApi.crew
            this.guest_stars = episodeFromTmdbApi.guest_stars
        }
    }
      interface Crew {
        department: string
        job: string
        credit_id: string
        adult: boolean
        gender: number
        id: number
        known_for_department: string
        name: string
        original_name: string
        popularity: number
        profile_path?: string
      }
      
      interface GuestStar {
        character: string
        credit_id: string
        order: number
        adult: boolean
        gender: number
        id: number
        known_for_department: string
        name: string
        original_name: string
        popularity: number
        profile_path?: string
      }
      

