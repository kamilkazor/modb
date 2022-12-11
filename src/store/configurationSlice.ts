import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type LanguagesType = {
  iso_639_1: string,
  english_name: string,
  name: string
}[];
export type GenresType = {
  id: number;
  name: string;
}[];

interface StateInterface {
  languages: LanguagesType;
  movieGenres: GenresType;
  tvGenres: GenresType;
}

const initialState: StateInterface = {
  languages: [],
  movieGenres: [],
  tvGenres: []
}

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    setLanguages: (state, action: PayloadAction<LanguagesType>) => {
      state.languages = action.payload;
    },
    setMovieGenres: (state, action: PayloadAction<GenresType>) => {
      state.movieGenres = action.payload;
    },
    setTvGenres: (state, action: PayloadAction<GenresType>) => {
      state.tvGenres = action.payload;
    }
  }

})

export const { setLanguages, setMovieGenres, setTvGenres } = configurationSlice.actions;
export default configurationSlice.reducer;