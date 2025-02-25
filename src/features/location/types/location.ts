import { LanguageMap } from "@/shared/types/memex";

export interface Location {
  uid: string;
  order: number;
  data: {
    name: LanguageMap;
    latitude: string;
    longitude: string;
    description: LanguageMap;
  };
}

export interface LocationFormatted {
  uid: string;
  order: number;
  name: string;
  latitude: string;
  longitude: string;
  description: string;
}

export type LocationName =
  | "a"
  | "b"
  | "c"
  | (string & {});

export interface Location {}
