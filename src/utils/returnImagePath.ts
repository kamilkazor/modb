function returnImagePath(path: string|null, width: string) {
  if(!path) return null;
  return `https://image.tmdb.org/t/p/${width}/${path}`;

}

export default returnImagePath;