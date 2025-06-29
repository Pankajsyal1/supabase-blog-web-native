import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useUuid(): string {
  return useMemo(() => uuidv4(), []);
}
