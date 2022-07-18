import { Character, CharactersPagination } from "types/character";
import CharacterCard from "./CharacterCard";
import { useQuery } from "react-query";
import queryFn from "../../utils/queryFn";
import styled from "@emotion/styled/macro";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";

const Container = styled("div")`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0;
`;

const Grid = styled("div")`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, 1fr);
`;

const Characters = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
  const { data } = useQuery<{
    data: Character[];
    pagination: CharactersPagination;
  }>(["characters", page], queryFn(`/characters`, { page }));

  const onChangePage = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  return (
    <Container>
      <Grid>
        {(data?.data || []).map((character) => (
          <CharacterCard character={character} key={character.mal_id} />
        ))}
      </Grid>
      {data?.pagination && (
        <Pagination
          currentPage={page}
          totalPage={data.pagination.last_visible_page}
          onChangePage={onChangePage}
        />
      )}
    </Container>
  );
};

export default Characters;
