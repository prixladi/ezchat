import * as R from 'ramda';
import { useCallback } from 'react';

const colors = [
  'bg-white',
  'bg-green-100',
  'bg-green-200',
  'bg-green-300',
  'bg-sky-100',
  'bg-sky-200',
  'bg-sky-300',
  'bg-purple-100',
  'bg-purple-200',
  'bg-purple-300',
  'bg-amber-100',
  'bg-amber-200',
  'bg-amber-300',
  'bg-zinc-200',
  'bg-zinc-300',
  'bg-zinc-400',
  'bg-red-100',
  'bg-red-200',
  'bg-red-300',
  'bg-red-400',
];

const useAvatarColor = () => {
  const getAvatarColor = useCallback(
    (id: string) => {
      const hash = R.reduce((acc, cur) => acc + cur.charCodeAt(0), 0, id.split(''));
      return colors[hash % colors.length];
    },
    [colors],
  );

  const getAvatarLetter = useCallback(
    (username?: string) =>
      R.isNil(username) || username.length === 0 ? 'A' : username[0].toUpperCase(),
    [],
  );

  return {
    getAvatarColor,
    getAvatarLetter,
  };
};

export default useAvatarColor;
