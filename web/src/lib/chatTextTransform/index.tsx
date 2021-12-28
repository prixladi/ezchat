import * as R from 'ramda';
import emojiTable from './emojiTable';
import tokenize, { Token } from './tokenize';

const encode = (str: string | undefined, id: string): React.ReactNode | null => {
  if (R.isNil(str)) {
    return null;
  }

  const tokens = tokenize(str);

  const groups = R.groupWith(
    (x, y) =>
      (x.type === 'emoji' || x.type === 'string') && (y.type === 'emoji' || y.type === 'string'),
    tokens,
  );

  const elements = R.addIndex<Token[], JSX.Element>(R.map)((x, i) => {
    const first = x[0];
    const key = `${id}-token-${i}`;

    if (first.type === 'link') {
      return (
        <a
          key={key}
          target="_blank"
          className="text-teal-500 font-extrabold underline hover:no-underline"
          href={first.subString}
          rel="noreferrer"
        >{` ${first.subString}`}</a>
      );
    }

    return (
      <span key={key}>
        {R.reduce(
          (acc, curr) => {
            const emo = emojiTable[curr.subString];
            return `${acc}${emo || curr.subString} `;
          },
          '',
          x,
        )}
      </span>
    );
  }, groups);

  return elements;
};

const decode = (): string | null => {
  throw new Error('Chat text decoding is not supported');
};

export { encode, decode };
