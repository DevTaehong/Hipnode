export interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export interface User {
  id: number;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string | null;
  bio?: string | null;
  picture: string;
  location?: string | null;
  joinedAt: Date;
}
