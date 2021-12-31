import * as R from 'ramda';
import clsx from 'clsx';
import { CurrentUserDto, MessageRecievedData } from '@api-models';
import ChatUserPopover from './chatUserPopover';
import TextMessage from './textMessage';

type Props = {
  messageGroup: MessageRecievedData[];
  currentUser: CurrentUserDto;
};

const MessageGroup: React.FC<Props> = ({ messageGroup, currentUser }) => {
  const { user } = messageGroup[0];
  const isCurrentUserMessage = currentUser.id === user.id;

  return (
    <div
      className={clsx('font-bold leading-loose break-all text-md flex gap-2', {
        'ml-auto': isCurrentUserMessage,
      })}
    >
      <ChatUserPopover user={user} isCurrentUserMessage={isCurrentUserMessage} />
      <span
        className={clsx({
          'chat-bubble-cr order-1': isCurrentUserMessage,
          'chat-bubble order-2': !isCurrentUserMessage,
        })}
      >
        <span className="flex flex-col-reverse">
          {R.map(
            (a) => (
              <TextMessage key={a.id} message={a} />
            ),
            messageGroup,
          )}
        </span>
      </span>
    </div>
  );
};

export default MessageGroup;
