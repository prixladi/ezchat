import clsx from 'clsx';
import Tooltip from 'react-tooltip';
import useAvatar from '../hooks/useAvatar';
import { tooltipCommonProps } from '../utils';

type Props = {
  user: {
    id: string;
    username: string;
  };
  isCurrentUserMessage: boolean;
};

const ChatUser: React.FC<Props> = ({ user }) => {
  const { getAvatarColor, getAvatarLetter } = useAvatar();

  const usernameId = `username-${user.username}`;
  return (
    <div
      data-tip
      data-for={usernameId}
      className={clsx(
        'cursor-pointer order-2 rounded-full border-2 dark:text-black border-gray-900 px-1',
        'w-10 h-8 text-center p-1 text-lg font-extrabold pb-8 col-span-1 min-w-40',
        getAvatarColor(user.id),
      )}
    >
      {getAvatarLetter(user.username)}
      <Tooltip {...tooltipCommonProps} clickable id={usernameId} effect="solid">
        {user.username}
      </Tooltip>
    </div>
  );
};

export default ChatUser;
