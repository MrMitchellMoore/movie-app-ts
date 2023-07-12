"use client";
import { useEffect, useState } from "react";
import { requests } from "@/lib/Requests";

export function Main() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const results = await fetch(requests.requestPopular, {
      next: { revalidate: 10 },
    });
    const movies = await results.json();
    console.log(movies);
    setMovies(movies);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return <div>Main</div>;
}
