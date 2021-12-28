import * as R from 'ramda';
import emojiTable from './emojiTable';
import tokenize from './tokenize';

const encode = (str?: string): React.ReactNode | null => {
  if (R.isNil(str)) {
    return null;
  }

  const tokens = tokenize(str);

  return R.reduce(
    (acc, curr) => {
      const str = emojiTable[curr.subString];
      return `${acc} ${str || curr.subString}`;
    },
    '',
    tokens,
  );
};

const decode = (_: string): string | null => {
  throw new Error('Chat text decoding is not supported');
};

export { encode, decode };
