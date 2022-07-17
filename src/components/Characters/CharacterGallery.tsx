import Character from "../../types/character";
import Img from "../Img";
import { ClassNames } from "@emotion/react/macro";

interface IProps {
  character: Character;
}

const CharacterGallery = ({ character }: IProps) => {
  return (
    <ClassNames>
      {({ css }) => (
        <Img
          src={character.images.jpg.image_url}
          lazy
          className={css`
            width: 100%;
            height: 240px;
            object-fit: contain;
          `}
        />
      )}
    </ClassNames>
  );
};

export default CharacterGallery;
