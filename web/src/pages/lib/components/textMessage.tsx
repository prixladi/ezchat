import { MessageRecievedData } from '@api-models';
import tokenize, { Token, emojiTable } from '@lib/tokenization';
import * as R from 'ramda';
import { useMemo } from 'react';

type Props = {
  message: MessageRecievedData;
};

const TextMessage: React.FC<Props> = ({ message: { id, content } }) => {
  const tokens = useMemo(() => tokenize(content), [content]);

  if (R.isNil(content)) {
    return null;
  }

  const grouping = R.groupWith<Token>(
    (x, y) =>
      (x.type === 'emoji' || x.type === 'string') && (y.type === 'emoji' || y.type === 'string'),
  );

  const indexedMap = R.addIndex<Token[], JSX.Element>(R.map)((x, i) => {
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
        >{`${first.subString} `}</a>
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
  });

  return <span key={`text-${id}`}>{R.pipe(grouping, indexedMap)(tokens)}</span>;
};

export default TextMessage;
