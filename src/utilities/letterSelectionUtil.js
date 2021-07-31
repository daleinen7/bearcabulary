// Alphabets to be used for generating selectable letters
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

// Generates selectable letters from given word
export const makeSelectableLetters = (word) => {
  let generated = word.split('');
  for (let i = generated.length; i < 10; i++) {
    generated.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }
  return shuffleArray(generated);
};

// Helper function to shuffle an Array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Generates blank strings from given word length
export const makeBlankLetters = (word) => {
  let blankLetters = [];
  for (let i = 0; i < word.length; i++) {
    blankLetters.push('');
  }
  return blankLetters;
};
