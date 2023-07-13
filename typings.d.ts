import { User } from "firebase/auth";

declare module "tailwind-scrollbar-hide";
type Movie = {
  id: number;
  title: string;
  genre_ids?: number[];
  adult?: boolean;
  backdrop_path?: string;
  poster_path: string;
  original_title?: string;
  original_language?: string;
  overview?: string;
  popularity?: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
};
