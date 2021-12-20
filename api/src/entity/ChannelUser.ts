import { Entity, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn, Column } from 'typeorm';
import Channel from './Channel';
import User from './User';

@Entity('channel_users')
@Index('UX_userId_channelId', ['userId', 'channelId'], { unique: true })
export default class ChannelUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  channelId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Channel, (channel) => channel.users)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;
}
