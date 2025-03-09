import { UUID } from 'crypto';

export type { UUID } from 'crypto';

export interface AbstractEntity {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
}

export * from './user';
export * from './url';
