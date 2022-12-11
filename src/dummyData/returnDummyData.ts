import languages from "./data/languages";
import movieGenres from "./data/movieGenres";
import tvGenres from "./data/tvGenres";

import moviesPopular from "./data/moviesPopular";
import moviesTopRated from "./data/moviesTopRated";
import moviesNowPlaying from "./data/moviesNowPlaying";
import showsPopular from "./data/showsPopular";
import showsTopRated from "./data/showsTopRated";

import movie from "./data/movie";
import movieCredits from "./data/movieCredits";
import movieRecommendations from "./data/movieRecommendations";
import movieSimilar from "./data/movieSimilar";

import show from "./data/show";
import showCredits from "./data/showCredits";
import showRecommendations from "./data/showRecommendations";
import showSimilar from "./data/showSimilar";
import showSeason0 from "./data/showSeason0";
import showSeason1 from "./data/showSeason1";
import showSeason2 from "./data/showSeason2";
import showSeason3 from "./data/showSEason3";
import showSeason4 from "./data/showSeason4";
import showSeason5 from "./data/showSeason5";
import showSeason6 from "./data/showSeason6";

import person from "./data/person";
import personCredits from "./data/personCredits";

import searchSuggestions from "./data/searchSuggestions";

import searchPeople1 from "./data/searchPeople1";
import searchShows1 from "./data/searchShows1";
import searchMovies1 from "./data/searchMovies1";
import searchMovies2 from "./data/searchMovies2";
import searchMovies3 from "./data/searchMovies3";
import searchMovies4 from "./data/searchMovies4";
import searchMovies5 from "./data/searchMovies5";
import searchMovies6 from "./data/searchMovies6";
import searchMovies7 from "./data/searchMovies7";
import searchMovies8 from "./data/searchMovies8";

import discoverMovies1 from "./data/discoverMovies1";
import discoverMovies2 from "./data/discoverMovies2";
import discoverMovies3 from "./data/discoverMovies3";
import discoverMovies4 from "./data/discoverMovies4";
import discoverMovies5 from "./data/discoverMovies5";
import discoverShows1 from "./data/discoverShows1";
import discoverShows2 from "./data/discoverShows2";
import discoverShows3 from "./data/discoverShows3";
import discoverShows4 from "./data/discoverShows4";
import discoverShows5 from "./data/discoverShows5";


const dataAddresses: Array<[RegExp, any]> = [
  [/https:\/\/api.themoviedb.org\/3\/configuration\/languages\?/, languages],
  [/https:\/\/api.themoviedb.org\/3\/genre\/movie\/list\?/, movieGenres],
  [/https:\/\/api.themoviedb.org\/3\/genre\/tv\/list\?/, tvGenres],
  [/https:\/\/api.themoviedb.org\/3\/movie\/popular\?/, moviesPopular],
  [/https:\/\/api.themoviedb.org\/3\/movie\/top_rated\?/, moviesTopRated],
  [/https:\/\/api.themoviedb.org\/3\/movie\/now_playing\?/, moviesNowPlaying],
  [/https:\/\/api.themoviedb.org\/3\/tv\/popular\?/, showsPopular],
  [/https:\/\/api.themoviedb.org\/3\/tv\/top_rated\?/, showsTopRated],
  [/https:\/\/api.themoviedb.org\/3\/movie\/(\d+)\?/, movie],
  [/https:\/\/api.themoviedb.org\/3\/movie\/(\d+)\/credits\?/, movieCredits],
  [/https:\/\/api.themoviedb.org\/3\/movie\/(\d+)\/recommendations\?/, movieRecommendations],
  [/https:\/\/api.themoviedb.org\/3\/movie\/(\d+)\/similar\?/, movieSimilar],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\?/, show],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\/aggregate_credits\?/, showCredits],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\/recommendations\?/, showRecommendations],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\/similar\?/, showSimilar],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\/season\/0\?/, showSeason0],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\/season\/1\?/, showSeason1],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\/season\/2\?/, showSeason2],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\/season\/3\?/, showSeason3],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\/season\/4\?/, showSeason4],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\/season\/5\?/, showSeason5],
  [/https:\/\/api.themoviedb.org\/3\/tv\/(\d+)\/season\/6\?/, showSeason6],
  [/https:\/\/api.themoviedb.org\/3\/person\/(\d+)\?/, person],
  [/https:\/\/api.themoviedb.org\/3\/person\/(\d+)\/combined_credits\?/, personCredits],
  [/https:\/\/api.themoviedb.org\/3\/search\/multi\?/, searchSuggestions],
  [/https:\/\/api.themoviedb.org\/3\/search\/person\?(.*)page=1/, searchPeople1],
  [/https:\/\/api.themoviedb.org\/3\/search\/tv\?(.*)page=1/, searchShows1],
  [/https:\/\/api.themoviedb.org\/3\/search\/movie\?(.*)page=1/, searchMovies1],
  [/https:\/\/api.themoviedb.org\/3\/search\/movie\?(.*)page=2/, searchMovies2],
  [/https:\/\/api.themoviedb.org\/3\/search\/movie\?(.*)page=3/, searchMovies3],
  [/https:\/\/api.themoviedb.org\/3\/search\/movie\?(.*)page=4/, searchMovies4],
  [/https:\/\/api.themoviedb.org\/3\/search\/movie\?(.*)page=5/, searchMovies5],
  [/https:\/\/api.themoviedb.org\/3\/search\/movie\?(.*)page=6/, searchMovies6],
  [/https:\/\/api.themoviedb.org\/3\/search\/movie\?(.*)page=7/, searchMovies7],
  [/https:\/\/api.themoviedb.org\/3\/search\/movie\?(.*)page=8/, searchMovies8],
  [/https:\/\/api.themoviedb.org\/3\/discover\/movie\?(.*)page=1/, discoverMovies1],
  [/https:\/\/api.themoviedb.org\/3\/discover\/movie\?(.*)page=2/, discoverMovies2],
  [/https:\/\/api.themoviedb.org\/3\/discover\/movie\?(.*)page=3/, discoverMovies3],
  [/https:\/\/api.themoviedb.org\/3\/discover\/movie\?(.*)page=4/, discoverMovies4],
  [/https:\/\/api.themoviedb.org\/3\/discover\/movie\?(.*)page=5/, discoverMovies5],
  [/https:\/\/api.themoviedb.org\/3\/discover\/tv\?(.*)page=1/, discoverShows1],
  [/https:\/\/api.themoviedb.org\/3\/discover\/tv\?(.*)page=2/, discoverShows2],
  [/https:\/\/api.themoviedb.org\/3\/discover\/tv\?(.*)page=3/, discoverShows3],
  [/https:\/\/api.themoviedb.org\/3\/discover\/tv\?(.*)page=4/, discoverShows4],
  [/https:\/\/api.themoviedb.org\/3\/discover\/tv\?(.*)page=5/, discoverShows5],

]

function returnDummyData(url: string) {
  let data: any = undefined;
  for(let i=0; i<dataAddresses.length; i++) {
    if(dataAddresses[i][0].test(url)) {
      data = dataAddresses[i][1];
      break;
    }
  }
  return data;
}

export default returnDummyData;