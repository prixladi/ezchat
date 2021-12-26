import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import Message from './Message';

@Entity('channels')
@Index('UX_channel_code', ['code'], { unique: true })
export default class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column()
  code: string;

  @OneToMany(() => Message, (e) => e.channelId, { cascade: ['insert'] })
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static validCodeRegex = /^[a-zA-Z0-9_-]*$/;
}
