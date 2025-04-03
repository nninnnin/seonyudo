import {
  LanguageMap,
  MediaInterface,
} from "@/shared/types/memex";

export interface Location {
  uid: string;
  order: number;
  data: {
    name: LanguageMap;
    latitude: string;
    longitude: string;
    placeDescription: LanguageMap;
    arTitle: LanguageMap;
    arImage: MediaInterface;
    description: LanguageMap;
    arContentsUrl: LanguageMap;
    slug: LocationSlugs;
  };
}

export interface LocationFormatted {
  uid: string;
  order: number;
  name: LanguageMap;
  latitude: string;
  longitude: string;
  arTitle: string;
  arImage: {
    name: string;
    path: string;
  };
  description: LanguageMap;
  placeDescription: LanguageMap;
  arContentsUrl: string;
  slug: LocationSlugs;
}

export type LocationName =
  | "시간의 정원"
  | "수질정화원"
  | "선유도 전망대"
  | "선유정"
  | "녹색기둥의 정원"
  | (string & {});

export type LocationSlugs =
  | "seonyugyo"
  | "transitiongarden"
  | "greencolumns"
  | "seonyujeong"
  | "purification";

export interface Location {}
