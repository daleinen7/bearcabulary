export const findImage = (images, story, counter) => {
  console.log("images", images);
  console.log("story", story);
  console.log("counter", counter);

  const result = images.find(
    (ele) => ele.relativePath === story.section[counter].media.slice(5)
  ).childrenImageSharp[0]?.gatsbyImageData;

  console.log(result);
  return result;
};
