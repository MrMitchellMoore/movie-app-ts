"use client";
import { useEffect, useState } from "react";
import { requests } from "@/lib/Requests";
import Image from "next/image";
import { Movie } from "@/typings";

export function Main() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  const getMovie = async (resName: string) => {
    const result: Movie[] = await fetch(resName, {
      next: { revalidate: 15 },
    })
      .then((res) => res.json())
      .then((data) => data.results)
      .catch((error: Error) => console.log(error.message));
    //console.log(movie[0]);
    setMovies(result);
  };

  useEffect(() => {
    getMovie(requests.requestPopular);
  }, []);

  const truncateString = (str: string | undefined, num: number) => {
    if (str?.length! > num) return str?.slice(0, num) + "...";
    return str;
  };

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <Image
          className="w-full h-full object-cover md:object-center aspect-auto"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          width={768}
          height={500}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[75%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
}
