"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type RowProps = {
  title: string;
  fetchURL: string;
};

export function Row({ title, fetchURL }: RowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(fetchURL, { next: { revalidate: 15 } })
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error: Error) => console.log(error.message));
  }, [fetchURL]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center">
        <div id={"slider"}>
          {movies.map((item) => (
            <div
              key={item.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 text-white"
            >
              <Image
                className="w-full h-[133px] block object-fit aspect-auto"
                alt={item.title}
                src={`https://image.tmdb.org/t/p/w500/${
                  !item?.backdrop_path ? item.poster_path : item?.backdrop_path
                }`}
                width={250}
                height={133}
              />

              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
