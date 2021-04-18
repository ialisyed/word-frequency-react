import { Dictionary } from "../interface";
import levenshteinDistance from "../lib/levenshtein-distance";

interface WordSimilarity {
  frequency: number;
  similarWords: Dictionary;
}

function getWordSimilarity(
  requestedWord: string,
  notebookEntry: string
): WordSimilarity {
  const wordRegex = /\w+/g;
  const words = notebookEntry.match(wordRegex) || [];
  let frequency = 0;
  for (let word of words) {
    if (word === requestedWord) {
      frequency += 1;
    }
  }
  const similarWords = words
    .filter((word) => levenshteinDistance(word, requestedWord) === 1)
    .reduce(
      (output: Dictionary, word) =>
        Object.assign(output, { [word]: output[word] ? output[word] + 1 : 1 }),
      {}
    );
  return { frequency, similarWords } as WordSimilarity;
}

export default getWordSimilarity;
