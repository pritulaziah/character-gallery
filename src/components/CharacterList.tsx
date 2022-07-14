import { useEffect, useState } from "react";
import axios from "axios";
import Character from "../types/character";
import CharacterCard from "./CharacterCard";
import { useQuery } from "react-query";
import queryFn from "../utils/queryFn";

const CharacterList = () => {
  const { data } = useQuery<{ data: Character[] }>(
    ["characters"],
    queryFn(`/characters`, { limit: 3 })
  );

  return (
    <>
      {(data?.data || []).map((character) => (
        <CharacterCard character={character} key={character.mal_id} />
      ))}
    </>
  );
};

export default CharacterList;
