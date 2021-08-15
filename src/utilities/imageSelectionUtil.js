export const findImage = (images, story, counter) => {
  const result = images.find(
    (ele) => ele.relativePath === story.section[counter].media.slice(5)
  ).childrenImageSharp[0]?.gatsbyImageData;

  return result;
};
