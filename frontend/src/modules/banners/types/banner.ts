export type ImageFormData = {
  file: File;
};

export type BannerFile = {
  bannerId: string;
  name: string;
  type: string;
  url: string;
};

export type BannerFormData = {
  name: string;
  type: string;
  size: number;
  file: FileList;
};

