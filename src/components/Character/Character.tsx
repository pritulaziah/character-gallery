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

const StyledBodyText = styled("div")`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #1d2129;
  white-space: pre-wrap;
  padding: 8px;
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

    const aboutArray = character.about.split(/\n{2}/);
    const hasInfo = /(.*\:.*\n){3}/g.test(aboutArray[0]);
    let characterInfo: [string, string][] | undefined;

    if (hasInfo) {
      const info = aboutArray.shift() as string;
      characterInfo = info.split("\n").map((item) => item.split(":")) as [
        string,
        string
      ][];
    }

    content = (
      <>
        <StyledSliderWrapper>
          <Slider collection={[...collectionPictures]} />
        </StyledSliderWrapper>
        <StyledBody>
          <StyledBodyHeader>
            <StyledBodyHeaderTitle>
              {`${character.name}${character.name_kanji ? ` / ${character.name_kanji}` : ''}`}
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
          {characterInfo && <CharacterInfo info={characterInfo} />}
          <StyledBodyText>{aboutArray.join("\n\n")}</StyledBodyText>
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
