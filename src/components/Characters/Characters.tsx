import { Character, CharactersPagination } from "types/character";
import CharacterCard from "./CharacterCard";
import { useQuery } from "react-query";
import queryFn from "../../utils/queryFn";
import styled from "@emotion/styled/macro";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";
import { useCallback, useEffect, useState } from "react";
import Loader from "components/Loader/Loader";

interface CharactersData {
  data: Character[];
  pagination: CharactersPagination;
}

const StyledGrid = styled("div")`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 12px;
`;

const StyledLoader = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [charactersData, setCharactersData] = useState<CharactersData | null>(
    null
  );
  const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;
  const { data, isLoading } = useQuery<CharactersData>(
    ["characters", page],
    queryFn(`/characters`, { page })
  );

  useEffect(() => {
    data && setCharactersData(data);
  }, [data]);

  const onChangePage = useCallback(
    (page: number) => {
      setSearchParams({ page: String(page) });
    },
    [setSearchParams]
  );

  return (
    <>
      {!!charactersData?.data ? (
        <StyledGrid>
          {charactersData?.data.map((character) => (
            <CharacterCard character={character} key={character.mal_id} />
          ))}
        </StyledGrid>
      ) : (
        <StyledLoader>
          <Loader size="large" />
        </StyledLoader>
      )}
      {charactersData?.pagination && (
        <Pagination
          currentPage={page}
          totalPage={charactersData.pagination.last_visible_page}
          onChangePage={onChangePage}
        />
      )}
    </>
  );
};

export default Characters;
