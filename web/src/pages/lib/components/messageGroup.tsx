import * as R from 'ramda';
import clsx from 'clsx';
import { CurrentUserDto, MessageRecievedData } from '@api-models';
import Tooltip from 'react-tooltip';
import ChatUser from './chatUser';
import TextMessage from './textMessage';
import { tooltipCommonProps } from '../utils';
import { Fragment } from 'react';

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
      <ChatUser user={user} isCurrentUserMessage={isCurrentUserMessage} />
      <span
        className={clsx({
          'chat-bubble-cr order-1': isCurrentUserMessage,
          'chat-bubble order-2': !isCurrentUserMessage,
        })}
      >
        <span className="flex flex-col-reverse">
          {R.map(
            (a) => (
              <Fragment key={a.id}>
                <Tooltip
                  {...tooltipCommonProps}
                  place={isCurrentUserMessage ? 'left' : 'right'}
                  clickable
                  id={a.id}
                  effect="solid"
                >
                  {new Date(a.createdAt).toLocaleString()}
                </Tooltip>
                <span className="cursor-pointer" data-tip data-for={a.id}>
                  <TextMessage message={a} />
                </span>
              </Fragment>
            ),
            messageGroup,
          )}
        </span>
      </span>
    </div>
  );
};

export default MessageGroup;
