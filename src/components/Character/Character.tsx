import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import queryFn from "utils/queryFn";
import { Images, FullCharacter } from "types/character";
import styled from "@emotion/styled/macro";
import Slider, { StyledSliderArrow } from "components/Slider";
import CharacterInfo from "./CharacterInfo";
import IconLink from "components/Icons/Link";
import Link from "components/Link";
import Loader from "components/Loader";

const StyledBody = styled("div")`
  display: flex;
  flex-direction: column;
`;

const StyledBodyLinkWrapper = styled("div")`
  display: flex;
  align-items: center;
`;

const StyledBodyLinkWrapperIcon = styled("span")`
  margin-right: 4px;
`;

const StyledBodyHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  padding: 8px;
`;

const StyledBodyHeaderTitle = styled("h3")`
  font-size: 16px;
  line-height: 24px;
  color: #1d2129;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0;
`;

const StyledSliderWrapper = styled("div")`
  display: flex;
  height: 350px;
  margin: 0 auto 12px;
  max-width: 35%;
  width: 100%;

  &:hover {
    ${StyledSliderArrow} {
      opacity: 1;
    }
  }
`;

const StyledCharacter = styled("div")`
  display: flex;
  flex-direction: column;
`;

const Character = () => {
  const { characterId } = useParams();
  const { data: characterData, isLoading: characterDataIsLoading } = useQuery<{
    data: FullCharacter;
  }>(
    ["characterFullById", characterId],
    queryFn(`/characters/${characterId}/full`)
  );
  const { data: characterPicturesData } = useQuery<{ data: Images[] }>(
    ["characterImages", characterId],
    queryFn(`/characters/${characterId}/pictures`)
  );

  const character = characterData?.data;
  let content: React.ReactNode = null;

  if (character != null) {
    const collectionPictures = new Set<string>([
      character.images.jpg.image_url,
    ]);
    const pictures = characterPicturesData?.data;

    if (pictures) {
      for (const pic of pictures) {
        collectionPictures.add(pic.jpg.image_url);
      }
    }

    const infosArray = (character.about || "")
      .split(/\n/)
      .map((item) => item.trim())
      .filter(Boolean);
    const startTextIdx = infosArray.findIndex((item) => item.length > 150);
    const characterInfo = (
      startTextIdx !== -1 ? infosArray.slice(0, startTextIdx) : infosArray
    )
      .map((item) => {
        const firstSeparator = item.indexOf(":");

        return [item.slice(0, firstSeparator), item.slice(firstSeparator + 1)]
          .map((item) => item.trim())
          .filter(Boolean);
      })
      .filter((item) => item.length === 2) as [string, string][];

    content = (
      <>
        <StyledSliderWrapper>
          <Slider collection={[...collectionPictures]} />
        </StyledSliderWrapper>
        <StyledBody>
          <StyledBodyHeader>
            <StyledBodyHeaderTitle>
              {`${character.name}${
                character.name_kanji ? ` / ${character.name_kanji}` : ""
              }`}
            </StyledBodyHeaderTitle>
            <Link href={character.url} target="_blank">
              <StyledBodyLinkWrapper>
                <StyledBodyLinkWrapperIcon>
                  <IconLink size="14px" />
                </StyledBodyLinkWrapperIcon>
                MyAnimeList
              </StyledBodyLinkWrapper>
            </Link>
          </StyledBodyHeader>
          {characterInfo && characterInfo.length > 0 && (
            <CharacterInfo info={characterInfo} />
          )}
        </StyledBody>
      </>
    );
  }

  if (characterDataIsLoading) {
    content = <Loader size="large" />;
  }

  return <StyledCharacter>{content}</StyledCharacter>;
};

export default Character;
