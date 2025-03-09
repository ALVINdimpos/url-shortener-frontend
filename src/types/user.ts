import { AbstractEntity } from '.';
import { IUrl } from './url';

export interface IUser extends AbstractEntity {
  email: string;
  username: string;
  password?: string; // Optional since it might not be returned in responses
  google_id?: string;
  github_id?: string;
  urls?: IUrl[];
}

// Type for user creation/registration
export interface IUserCreate extends Omit<IUser, 'id' | 'urls'> {
  password: string; // Required for creation
}

// Type for user login
export interface IUserLogin {
  email: string;
  password: string;
}

// Type for social login
export interface ISocialLogin {
  email: string;
  username: string;
  google_id?: string;
  github_id?: string;
}
