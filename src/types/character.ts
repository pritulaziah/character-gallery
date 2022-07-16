export interface CharactersPagination {
  current_page: number
  has_next_page: boolean
  items: {
    count: number, total: number, per_page: number
  }
  last_visible_page: number
}

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
