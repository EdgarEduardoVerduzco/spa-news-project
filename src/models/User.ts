export interface User {
  id: number;
  name: string;
  user: string;
  password?: string;
  active: boolean;
  image?: string;
  admin: boolean
}