import { useQuery } from "react-query";
import queryFn from "../utils/queryFn";
import Character from "../types/character";
import Slider from "./Slider";
import styled from '@emotion/styled/macro'
import { Arrow } from "./Slider/SliderArrow";

const Card = styled('div')`
  width: 350px;
  box-shadow: 0 3px 15px 3px rgb(153 153 153 / 20%);
  transition: box-shadow 0.3s ease-in-out;
  height: 240px;
  position: relative;

  &:hover {
    ${Arrow} {
      opacity: 1;
    }
  }
`;

interface IProps {
  character: Character;
}

const CharacterCard = ({ character }: IProps) => {
  const characterId = character.mal_id;
  const { data } = useQuery<{ data: Character["images"][] }>(
    ["characterImages", characterId],
    queryFn(`/characters/${characterId}/pictures`)
  );

  const preparedImages = (data?.data || []).map((image) => image.jpg.image_url);

  return (
    <Card>
      <Slider collection={preparedImages} />
    </Card>
  );
};

export default CharacterCard;
