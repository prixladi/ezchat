import * as R from 'ramda';
import emojiTable from './emojiTable';

type Token = {
  subString: string;
  type: 'string' | 'emoji' | 'link';
};

type Tokenized = Token[];

const linkRegex =
  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

const createToken = (str: string): Token => {
  if ((str.startsWith('http://') || str.startsWith('https://')) && linkRegex.test(str)) {
    return {
      subString: str,
      type: 'link',
    };
  }

  if (!R.isNil(emojiTable[str])) {
    return {
      subString: str,
      type: 'emoji',
    };
  }

  return {
    subString: str,
    type: 'string',
  };
};

export default (str: string): Tokenized => {
  const tokens: Tokenized = [];

  let inSpace = true;
  let currentToken = '';

  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === ' ') {
      if (currentToken != '') {
        tokens.push(createToken(currentToken));
        currentToken = '';
      }

      inSpace = true;
    } else {
      currentToken += str[i];
      inSpace = false;
    }
  }

  tokens.push(createToken(currentToken));

  return tokens;
};
