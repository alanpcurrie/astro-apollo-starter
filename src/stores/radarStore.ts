import { atom } from "nanostores";

type Quadrant = "Tools" | "Techniques" | "Platforms" | "languages-frameworks";
type Ring = "Adopt" | "Trial" | "Assess" | "Hold";
type Tags = "Frontend" | "Backend";

export type Blip = {
  id: string;
  name: string;
  quadrant: Quadrant;
  ring: Ring;
  description: string;
  hasAdr: boolean;
  tags: Array<Tags>;
};

export type Adr = {
  id: string;
  created: Date;
  status: string;
  author: string;
  reviewers: Array<string>;
};

export const blipsStore = atom<Blip[]>([]);
