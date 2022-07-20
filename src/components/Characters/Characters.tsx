import { Character, CharactersPagination } from "types/character";
import CharacterCard from "./CharacterCard";
import { useQuery } from "react-query";
import queryFn from "../../utils/queryFn";
import styled from "@emotion/styled/macro";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import Pagination from "../Pagination";
import throttle from "utils/throttle";
import { useCallback, useEffect, useState, useRef } from "react";
import Loader from "components/Loader/Loader";
import Input from "components/Input";
import Search from "components/Icons/Search";

interface CharactersData {
  data: Character[];
  pagination: CharactersPagination;
}

type SearchCharacterParams = {
  page: string;
  q: string;
};

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

const StyledSearch = styled("div")`
  margin-bottom: 12px;
`;

const getCharacterSearchParams = (searchParams: URLSearchParams) => ({
  page: searchParams.get("page") || "1",
  q: searchParams.get("q") || "",
});

const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { q, page } = getCharacterSearchParams(searchParams);
  const [searchInputValue, setSearchInputValue] = useState(q); // sync to query
  const [charactersData, setCharactersData] = useState<CharactersData | null>(
    null
  );
  // coz too many request
  const [searchCharacterParams, setSearchCharacterParams] =
    useState<SearchCharacterParams>(() =>
      getCharacterSearchParams(searchParams)
    );
  const onSearch = useCallback(
    (newSearchParams: URLSearchParams) =>
      setSearchCharacterParams(getCharacterSearchParams(newSearchParams)),
    []
  );
  const throttledOnSearch = useRef(throttle(onSearch, 2000));

  useEffect(() => {
    throttledOnSearch.current(searchParams);
  }, [searchParams]);

  const { data } = useQuery<CharactersData>(
    ["characters", searchCharacterParams.page, searchCharacterParams.q],
    queryFn(`/characters`, {
      page: searchCharacterParams.page,
      q: searchCharacterParams.q,
      order_by: "mal_id",
    })
  );

  useEffect(() => {
    data && setCharactersData(data);
  }, [data]);

  useEffect(() => {
    setSearchInputValue(q);
  }, [q]);

  const onChangePage = useCallback(
    (page: number) => {
      const params: URLSearchParamsInit = {};
      q !== "" && (params.q = q); // save q
      page !== 1 && (params.page = String(page));
      setSearchParams(params);
    },
    [setSearchParams, q]
  );

  const onChangeSearchInputValue = useCallback((value: string) => {
    const params: URLSearchParamsInit = {};
    value !== "" && (params.q = value);
    setSearchParams(params); // reset page
  }, []);

  return (
    <>
      <StyledSearch>
        <Input
          value={searchInputValue}
          onChange={onChangeSearchInputValue}
          placeholder="Find any character"
          after={<Search size="16px" color="#4E5969" />}
        />
      </StyledSearch>
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
          currentPage={Number(page)}
          totalPage={charactersData.pagination.last_visible_page}
          onChangePage={onChangePage}
        />
      )}
    </>
  );
};

export default Characters;
