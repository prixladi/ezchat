import { ChannelDto } from '@api-models';

type Props = {
  channel: ChannelDto;
};

const BeginningMessage: React.FC<Props> = ({ channel }) => (
  <div className="text-center text-lg mt-2 font-extrabold opacity-50 mb-auto text-slate-800 dark:text-slate-300">
    {new Date(channel.createdAt).toLocaleString()} is beginning of conversation here
  </div>
);

export default BeginningMessage;
