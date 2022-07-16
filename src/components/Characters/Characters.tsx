import Character, { CharactersPagination } from "../../types/character";
import CharacterCard from "./CharacterCard";
import { useQuery } from "react-query";
import queryFn from "../../utils/queryFn";
import styled from "@emotion/styled/macro";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";

const Grid = styled("div")`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
`;

const Characters = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
  const { data } = useQuery<{
    data: Character[];
    pagination: CharactersPagination;
  }>(["characters", page], queryFn(`/characters`, { page, limit: 16 }));

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 0' }}>
      <Grid>
        {(data?.data || []).map((character) => (
          <CharacterCard character={character} key={character.mal_id} />
        ))}
      </Grid>
      {data?.pagination && (
        <Pagination
          currentPage={page}
          totalPage={data.pagination.items.total}
        />
      )}
    </div>
  );
};

export default Characters;
