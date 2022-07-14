export interface CharacterImage {
  jpg: {
    image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
  };
}

interface Character {
  about: string;
  favorites: number;
  images: CharacterImage;
  mal_id: number;
  name: string;
  name_kanji: string;
  nicknames: string[];
  url: string;
}

export default Character;
