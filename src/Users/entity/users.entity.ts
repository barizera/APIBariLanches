import { Favorite } from 'src/favorites/entity/favorite.entity';

export class User {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  favorites?: Favorite[];
}
