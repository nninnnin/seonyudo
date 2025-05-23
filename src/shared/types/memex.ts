export interface LanguageMap {
  KO?: string;
  EN?: string;
}

export interface LanguageMapDesc {
  KO?: {
    name?: string;
    description?: string;
  };
  EN?: {
    name?: string;
    description?: string;
  };
}

export interface DateInterface {
  createdAt?: string | null;
  deletedAt?: string | null;
  editedAt?: string | null;
}

export type FileType =
  | "IMAGE"
  | "VIDEO"
  | "AUDIO"
  | "PDF"
  | "FILE";
export type MediaType = "FILE" | "URL";

export interface FileMetaInterface {
  width?: number;
  height?: number;
  size: string;
  type: string;
}

export interface FileInterface {
  _id: number;
  name: string;
  path: string;
  type: string;
  meta: FileMetaInterface;
  thumbnailList?: FileInterface[];
  date: DateInterface;
}

export interface MediaInterface {
  _id: number;
  languageMap: LanguageMapDesc;
  fileType: FileType;
  mediaType: MediaType;
  file: FileInterface;
  value?: string;
}

export interface CategoryInterface {
  _id: number;
  order: number;
  languageMap: LanguageMap;
}

export interface RelationInterface {
  _id: number;
  uid: string;
  languageMap: LanguageMap;
}

type MemexModelItem<Item> = {
  uid: string;
  data: Item;
  createdAt: string;
};

type PageInfo = {
  isLast: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type MemexListResult<Item> = {
  list: MemexModelItem<Item>[];
  pageInfo: PageInfo;
  validateAt: string;
};

export type FormattedCategory = {
  id: number;
  value: string;
};

export type FormattedImageMedia = {
  id: number;
  name: string;
  path: string;
};
