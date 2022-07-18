import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import queryFn from "utils/queryFn";
import { Images, FullCharacter } from "types/character";
import { useMemo } from "react";
import styled from "@emotion/styled/macro";
import Slider, { SliderArrowStyled } from "components/Slider";
import CharacterInfo from "./CharacterInfo";

const BodyTextStyled = styled("div")`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #1d2129;
  white-space: pre-wrap;
`;

const Card = styled("div")`
  box-shadow: 0 3px 15px 3px rgb(153 153 153 / 20%);
  transition: box-shadow 0.3s ease-in-out;
  position: relative;
  border-radius: 16px;
  height: 240px;

  &:hover {
    ${SliderArrowStyled} {
      opacity: 1;
    }
  }
`;

const Character = () => {
  const { characterId } = useParams();
  const { data: characterData, isLoading: characterIsLoading } = useQuery<{
    data: FullCharacter;
  }>(
    ["characterFullById", characterId],
    queryFn(`/characters/${characterId}/full`)
  );
  const { data: characterPicturesData, isLoading: characterPicturesIsLoading } =
    useQuery<{ data: Images[] }>(
      ["characterImages", characterId],
      queryFn(`/characters/${characterId}/pictures`)
    );

  const character = characterData?.data;

  const preparedImages = useMemo(
    () =>
      (characterPicturesData?.data || []).map((image) => image.jpg.image_url),
    [characterPicturesData]
  );

  if (character) {
    const aboutArray = character.about.split(/\n{2}/);
    const hasInfo = /(.*\:.*\n){3}/g.test(aboutArray[0]);
    let info: React.ReactNode;

    if (hasInfo) {
      const characterInfo = aboutArray[0]
        .split("\n")
        .map((item) => item.split(":")) as [string, string][];

      info = <CharacterInfo info={characterInfo} />;
    }

    return (
      <div>
        <Card>
          <Slider collection={preparedImages}></Slider>
        </Card>
        {info}
        <BodyTextStyled>{aboutArray.slice(1).join("\n\n")}</BodyTextStyled>
      </div>
    );
  }

  return null;
};

export default Character;
