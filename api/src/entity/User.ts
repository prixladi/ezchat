import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('users')
@Index('UX_username', ['username'], { unique: true })
@Index('UX_normalized_username', ['normalizedUsername'], { unique: true })
@Index('IX_is_anonymous', ['isAnonymous'])
@Index('UX_email', ['email'], { unique: true })
@Index('UX_normalized_email', ['normalizedEmail'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  normalizedUsername: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  normalizedEmail?: string;

  @Column({ nullable: true })
  passwordHash?: string;

  @Column({ nullable: true })
  passwordSalt?: string;

  @Column({ default: false })
  isDisabled: boolean;

  @Column({ default: false })
  isAnonymous: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static validUsernameRegex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  static validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
}
