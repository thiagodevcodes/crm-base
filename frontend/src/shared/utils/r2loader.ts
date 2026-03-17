import type { ImageLoaderProps } from "next/image";

const r2Loader = ({ src }: ImageLoaderProps) => {
  return src;
};

export default r2Loader;
