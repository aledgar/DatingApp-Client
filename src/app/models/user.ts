import {Photo} from './photo';

export interface User {
  id: number;
  email: string;
  knownAs: string;
  age: number;
  created: Date;
  lastActive: any;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
}
