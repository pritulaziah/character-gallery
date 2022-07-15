import Character from "../../types/character";
import CharacterCard from "./CharacterCard";
import { useQuery } from "react-query";
import queryFn from "../../utils/queryFn";
import styled from "@emotion/styled/macro";

const Grid = styled('div')`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, 1fr);
`

const CharacterList = () => {
  const { data } = useQuery<{ data: Character[] }>(
    ["characters"],
    queryFn(`/characters`, { page: 1 })
  );

  return (
    <Grid>
      {(data?.data || []).map((character) => (
        <CharacterCard character={character} key={character.mal_id} />
      ))}
    </Grid>
  );
};

export default CharacterList;
