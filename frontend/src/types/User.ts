import type { Dispatch, SetStateAction } from "react";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  cep: string;
  admin: boolean;
}

export type UserContextType = {
  user: UserInterface | null;
  setUser: Dispatch<SetStateAction<UserInterface | null>>;
};
