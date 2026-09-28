import type { Movie, OmdbSearchResponse } from '@/types/movie'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export async function searchMovies(query: string): Promise<Movie[]> {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  const response = await fetch(url)
  const data: OmdbSearchResponse = await response.json()

  if (data.Response === 'False' || !data.Search) {
    return []
  }

  return data.Search.map((item) => ({
    id: Number(item.imdbID.replace('tt', '')),
    title: item.Title,
    year: Number(item.Year),
  }))
}