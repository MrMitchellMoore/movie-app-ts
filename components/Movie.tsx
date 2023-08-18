import { Movie } from "@/typings";
import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

type MovieListProps = {
  item: Movie;
};

export function Movie({ item }: MovieListProps) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          backdrop_path: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie!");
    }
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 text-white">
      <Image
        className="w-full h-[133px] block object-fit aspect-auto"
        alt={item.title}
        src={`https://image.tmdb.org/t/p/w500/${
          !item?.backdrop_path ? item.poster_path : item?.backdrop_path
        }`}
        width={250}
        height={133}
        priority
      />

      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
}
