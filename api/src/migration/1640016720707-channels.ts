/* eslint-disable */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class channels1640016720707 implements MigrationInterface {
  name = 'channels1640016720707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "channel_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "channelId" uuid NOT NULL, CONSTRAINT "PK_2237cedc2591a4ad08535ec0f9c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UX_userId_channelId" ON "channel_users" ("userId", "channelId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "channels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "isAnonymous" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bc603823f3f741359c2339389f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_users" ADD CONSTRAINT "FK_3aa0c1e5049ac3cc786b39401d7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_users" ADD CONSTRAINT "FK_d12b993b093dcb8e2c440799803" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "channel_users" DROP CONSTRAINT "FK_d12b993b093dcb8e2c440799803"`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel_users" DROP CONSTRAINT "FK_3aa0c1e5049ac3cc786b39401d7"`,
    );
    await queryRunner.query(`DROP TABLE "channels"`);
    await queryRunner.query(`DROP INDEX "public"."UX_userId_channelId"`);
    await queryRunner.query(`DROP TABLE "channel_users"`);
  }
}
/* eslint-enable */
