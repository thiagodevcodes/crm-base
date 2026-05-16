export type ImageFormData = {
  file: File;
  bannerCategoryId: string;
};

export type BannerFile = {
  bannerId: string;
  name: string;
  type: string;
  url: string;
};

export type BannerFormData = {
  files: File[];
  bannerCategoryId: string;
};

export type UploadFormData = {
  files: File[];
  bannerCategoryId: string;
};

