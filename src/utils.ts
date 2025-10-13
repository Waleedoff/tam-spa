// src/utils/jwt.ts

import { jwtDecode } from 'jwt-decode';

export type ParsedTokenType = {
  id: string;
  username: string;
  role?: string;
  department?: string;
  exp?: number;
};

export const decodeToken = (token: string): ParsedTokenType | null => {
  try {
    return jwtDecode<ParsedTokenType>(token);
  } catch {
    return null;
  }
};
