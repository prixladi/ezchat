import { randomBytes } from 'crypto';
import Channel from '../../entity/Channel';

export default (code?: string): Channel => {
  const channel = new Channel();
  channel.code = code ?? randomBytes(9).toString('hex');
  return channel;
};
