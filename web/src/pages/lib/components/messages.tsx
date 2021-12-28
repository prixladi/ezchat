import { ChannelDto, CurrentUserDto, MessageRecievedData } from '@api-models';
import { encode } from '@lib/chatTextTransform';
import * as R from 'ramda';
import clsx from 'clsx';
import { ChatMessaging } from '../hooks/useChatMessaging';
import InfiniteScroll from '@lib/components/infiniteScroll';
import ChatUserPopover from './chatUserPopover';

type BeggingMessageProps = {
  channel: ChannelDto;
};

const BeggingMessage: React.FC<BeggingMessageProps> = ({ channel }) => (
  <div className="text-center text-lg mt-2 font-extrabold opacity-50 mb-auto text-slate-800 dark:text-slate-300">
    {new Date(channel.createdAt).toLocaleString()} is begining of conversation here
  </div>
);

const Loading = () => <div className="text-center font-extrabold text-xl">Loading...</div>;

type MessageBlockProps = {
  messageGroup: MessageRecievedData[];
  currentUser: CurrentUserDto;
};

const MessageBlock: React.FC<MessageBlockProps> = ({ messageGroup, currentUser }) => {
  const user = messageGroup[0].user;
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
              <span key={a.id}>{encode(a.content)}</span>
            ),
            messageGroup,
          )}
        </span>
      </span>
    </div>
  );
};

type Props = {
  messaging: ChatMessaging;
  currentUser: CurrentUserDto;
  channel: ChannelDto;
};

const Messages: React.FC<Props> = ({ messaging, currentUser, channel }) => {
  if (R.isNil(messaging.messages)) {
    return (
      <div className="pt-4">
        <Loading />
      </div>
    );
  }

  const grouped = R.groupWith(
    (a, b) =>
      a.user.id === b.user.id &&
      Math.abs(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) < 1000 * 60 * 20,
    messaging.messages,
  );

  return (
    <InfiniteScroll
      dataLength={messaging.messages.length}
      inverse={true}
      next={async () => await messaging.fetchNextPage()}
      hasMore={messaging.hasNextPage}
      loader={<Loading />}
      height="100%"
      className="overflow-auto rounded-xl h-full flex flex-col-reverse gap-6 mt-4 px-2"
    >
      {messaging.messages.length === 0 && messaging.isFetching ? (
        <Loading />
      ) : (
        <>
          {R.map((messageGroup) => {
            return (
              <MessageBlock
                key={`gr-${messageGroup[0].id}`}
                messageGroup={messageGroup}
                currentUser={currentUser}
              />
            );
          }, grouped)}
         {!messaging.hasNextPage && <BeggingMessage channel={channel} />}
        </>
      )}
    </InfiniteScroll>
  );
};

export default Messages;
