import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Channel from './Channel';
import User from './User';

@Entity('messages')
export default class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  content?: string;

  @Column()
  userId: string;

  @Column()
  channelId: string;

  @ManyToOne(() => User, (e) => e.messages)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Channel, (e) => e.messages)
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static validCodeRegex = /^[a-zA-Z0-9_-]*$/;
}
