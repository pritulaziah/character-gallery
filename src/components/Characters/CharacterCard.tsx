import Character from "types/character";
import styled from "@emotion/styled/macro";
import { Arrow } from "../Slider/SliderArrow";
import CharacterGallery from "./CharacterGallery";

const Card = styled("div")`
  box-shadow: 0 3px 15px 3px rgb(153 153 153 / 20%);
  transition: box-shadow 0.3s ease-in-out;
  position: relative;
  border-radius: 16px;

  &:hover {
    ${Arrow} {
      opacity: 1;
    }
  }
`;

const Info = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Name = styled("div")`
  padding: 4px 0;
  font-family: "Roboto";
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

interface IProps {
  character: Character;
}

const CharacterCard = ({ character }: IProps) => {
  return (
    <Card>
      <CharacterGallery character={character} />
      <Info>
        <Name>{character.name}</Name>
        <Name>{character.name_kanji}</Name>
      </Info>
    </Card>
  );
};

export default CharacterCard;
