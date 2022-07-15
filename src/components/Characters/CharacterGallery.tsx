import { useQuery } from "react-query";
import queryFn from "../../utils/queryFn";
import Character from "../../types/character";
import Slider from "../Slider/Slider";

interface IProps {
  character: Character;
}

const CharacterGallery = ({ character }: IProps) => {
  const characterId = character.mal_id;
  const { data } = useQuery<{ data: Character["images"][] }>(
    ["characterImages", characterId],
    queryFn(`/characters/${characterId}/pictures`)
  );

  const preparedImages = (data?.data || []).map((image) => image.jpg.image_url);

  return <Slider collection={preparedImages} />;
};

export default CharacterGallery;
