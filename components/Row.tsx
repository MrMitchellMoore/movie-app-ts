"use client";

import { useEffect, useState } from "react";
import { Movie } from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type RowProps = {
  title: string;
  fetchURL: string;
  rowID: string;
};

export function Row({ title, fetchURL, rowID }: RowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(fetchURL, { next: { revalidate: 15 } })
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error: Error) => console.log(error.message));
  }, [fetchURL]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID)!;
    slider.scrollLeft = slider?.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID)!;
    slider.scrollLeft = slider?.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          size={40}
          onClick={slideLeft}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-50 hidden group-hover:block left-0"
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item) => (
            <Movie key={item.id} item={item} />
          ))}
        </div>
        <MdChevronRight
          size={40}
          onClick={slideRight}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-50 hidden group-hover:block right-0"
        />
      </div>
    </>
  );
}
