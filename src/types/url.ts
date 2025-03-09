import { AbstractEntity } from '.';
import { IUser } from './user';

export interface IUrl extends AbstractEntity {
  short_code: string;
  long_url: string;
  user_id: string;
  clicks: number;
  user?: IUser;
}

// Type for URL creation
export interface IUrlCreate extends Pick<IUrl, 'long_url'> {
  user_id: string;
}

// Type for URL statistics
export interface IUrlStats extends IUrl {
  clicks_by_date?: {
    date: string;
    count: number;
  }[];
  clicks_by_location?: {
    country: string;
    count: number;
  }[];
  clicks_by_device?: {
    device: string;
    count: number;
  }[];
} 