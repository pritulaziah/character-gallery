export interface CharactersPagination {
  current_page: number;
  has_next_page: boolean;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
  last_visible_page: number;
}

type Image = {
  image_url: string;
  small_image_url: string;
};

export interface Images {
  jpg: Image;
  webp: Image;
}

export interface Character {
  about: string;
  favorites: number;
  images: Images;
  mal_id: number;
  name: string;
  name_kanji: string | null;
  nicknames: string[];
  url: string;
}

interface Manga {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
}

interface Anime extends Manga {}

export interface FullCharacter extends Character {
  url: string;
  manga: Array<{
    manga: Manga;
    role: string;
  }>;
  anime: Array<{
    anime: Anime;
    role: string;
  }>;
  voice: Array<{
    person: {
      mal_id: number;
      url: string;
      images: Omit<Images, "webp">;
      name: string;
    };
    language: string;
  }>;
}
