import { getImageProps } from "next/image";

export const getBackgroundImage = (srcSet = "") => {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
};

/**
 *
 * @param {import("next/image").ImageProps} imgProps
 */
export const optmizedBackgroundImage = (imgProps) => {
  const bgImage = getImageProps(imgProps);
  return getBackgroundImage(bgImage.props.srcSet);
};
