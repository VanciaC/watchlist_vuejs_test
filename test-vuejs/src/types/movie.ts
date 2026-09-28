export interface Movie {
  id: number
  title: string
  year: number
}

export interface OmdbSearchResult {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export interface OmdbSearchResponse {
  Search?: OmdbSearchResult[]
  Response: 'True' | 'False'
  Error?: string
}