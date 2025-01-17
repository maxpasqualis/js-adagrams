export const drawLetters = () => {
  const letterFrequencies = {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
  };
  const letterPool = [];
  for (const letter in letterFrequencies) {
    for (let i = 0; i < letterFrequencies[letter]; i++) {
      letterPool.push(letter);
    }
  }
  const drawnLetters = [];
  for (let i = 0; i < 10; i++) {
    const letterIndex = Math.floor(Math.random() * letterPool.length);
    drawnLetters.push(letterPool[letterIndex]);
    letterPool.splice(letterIndex, 1);
  }
  return drawnLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  let usableLetters = [...lettersInHand];
  for (const letter of input) {
    const usableLetterIndex = usableLetters.indexOf(letter);
    if (usableLetterIndex === -1) {
      return false;
    } else {
      usableLetters.splice(usableLetterIndex, 1);
    }
  }
  return true;
};

export const scoreWord = (word) => {
  const letterValues = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10,
  };
  let wordScore = 0;
  for (const letter of word.toUpperCase()) {
    wordScore += letterValues[letter];
  }
  if (word.length >= 7) {
    wordScore += 8;
  }
  return wordScore;
};

export const highestScoreFrom = (words) => {
  const highestScore = Math.max(...words.map((word) => scoreWord(word)));
  const winningWords = [];
  for (const word of words) {
    let wordScore = scoreWord(word);
    if (wordScore === highestScore) {
      if (word.length === 10) {
        return { word: word, score: wordScore };
      }
      winningWords.push(word);
    }
  }
  if (winningWords.length > 1) {
    const shortestLength = Math.min(...winningWords.map((word) => word.length));
    for (const word of winningWords) {
      if (word.length === shortestLength) {
        return { word: word, score: scoreWord(word) };
      }
    }
  }
  return { word: winningWords[0], score: scoreWord(winningWords[0]) };
};
