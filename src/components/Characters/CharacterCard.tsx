import { Character } from "types/character";
import styled from "@emotion/styled/macro";
import CharacterGallery from "./CharacterGallery";
import { useNavigate } from "react-router-dom";

const Card = styled("a")`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  position: relative;
  border-radius: 16px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
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
  const navigate = useNavigate();
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(`/characters/${character.mal_id}`);
  };

  return (
    <Card onClick={onClick}>
      <CharacterGallery character={character} />
      <Info>
        <Name>{character.name}</Name>
        <Name>{character.name_kanji}</Name>
      </Info>
    </Card>
  );
};

export default CharacterCard;
