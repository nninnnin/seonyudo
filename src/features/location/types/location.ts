import { LanguageMap } from "@/shared/types/memex";

export interface Location {
  uid: string;
  order: number;
  data: {
    name: LanguageMap;
    latitude: string;
    longitude: string;
    description: LanguageMap;
    arContentsUrl: LanguageMap;
  };
}

export interface LocationFormatted {
  uid: string;
  order: number;
  name: string;
  latitude: string;
  longitude: string;
  description: string;
  arContentsUrl: string;
}

export type LocationName =
  | "시간의 정원"
  | "수질정화원"
  | "선유도 전망대"
  | "선유정"
  | "녹색기둥의 정원"
  | (string & {});

export interface Location {}
