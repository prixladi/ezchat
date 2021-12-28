import { CurrentUserDto, MessageRecievedData } from '@api-models';
import { encode } from '@lib/chatTextTransform';
import * as R from 'ramda';
import clsx from 'clsx';

type Props = {
  data: MessageRecievedData[];
  currentUser: CurrentUserDto;
};

const getAvatarColor = (id: string) => {
  const hash = R.reduce((acc, cur) => acc + cur.charCodeAt(0), 0, id.split(''));

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

  return colors[hash % colors.length];
};

const Messages: React.FC<Props> = ({ data, currentUser }) => {
  const grouped = R.groupWith(
    (a, b) =>
      a.user.id === b.user.id &&
      Math.abs(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) < 1000 * 60 * 20,
    data,
  );

  return (
    <div className="overflow-auto rounded-xl h-full flex flex-col-reverse gap-6 mt-4 px-2">
      {R.map((messageGroup) => {
        const user = messageGroup[0].user;
        return (
          <div
            key={R.reduce((acc, curr) => acc + curr.id, '', messageGroup)}
            className={clsx('font-bold leading-loose break-all text-md flex gap-2', {
              'ml-auto': currentUser.id === user.id,
            })}
          >
            <div
              className={clsx(
                'order-2 rounded-full border-2 dark:text-black border-gray-900 px-1 w-10 h-8 text-center p-1 text-lg font-extrabold pb-8 col-span-1 min-w-40',
                getAvatarColor(user.id),
                {
                  'order-1': currentUser.id !== user.id,
                  'order-2': currentUser.id === user.id,
                },
              )}
            >
              {R.isNil(user.username) || user.username.length === 0
                ? 'A'
                : user.username[0].toUpperCase()}
            </div>
            <span
              className={clsx({
                'chat-bubble-cr order-1': currentUser.id === user.id,
                'chat-bubble order-2': currentUser.id !== user.id,
              })}
            >
              <span className="flex flex-col">
                {R.map(
                  (a) => (
                    <span key={a.id}>{encode(a.content)}</span>
                  ),
                  messageGroup.reverse(),
                )}
              </span>
            </span>
          </div>
        );
      }, grouped)}
    </div>
  );
};

export default Messages;
