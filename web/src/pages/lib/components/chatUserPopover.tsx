import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useRef, useState } from 'react';
import useAvatar from '../hooks/useAvatar';

type Props = {
  user: {
    id: string;
    username: string;
  };
  isCurrentUserMessage: boolean;
};

const ChatUserPopover: React.FC<Props> = ({ user }) => {
  const { getAvatarColor, getAvatarLetter } = useAvatar();
  let [isOpen, setIsOpen] = useState(false);
  const refDiv = useRef(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          'order-2 rounded-full border-2 dark:text-black border-gray-900 px-1 w-10 h-8 text-center p-1 text-lg font-extrabold pb-8 col-span-1 min-w-40',
          getAvatarColor(user.id),
        )}
      >
        {getAvatarLetter(user.username)}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          initialFocus={refDiv}
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center" ref={refDiv}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-slate-100 bg-opacity-75" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className=" w-fit inline-block p-6 my-8 overflow-hidden text-left 
                align-middle h-fit transition-all transform rounded-2xl"
              >
                <Dialog.Title as="h3" className="text-lg md:text-4xl lg:text-6xl font-extrabold leading-6 text-gray-900">
                  {user.username}
                </Dialog.Title>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChatUserPopover;
