import { MigrationInterface, QueryRunner } from 'typeorm'

export class users1639345296463 implements MigrationInterface {
  name = 'users1639345296463'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "normalizedUsername" character varying NOT NULL, "email" character varying, "normalizedEmail" character varying, "passwordHash" character varying, "passwordSalt" character varying, "isDisabled" boolean NOT NULL DEFAULT false, "isAnonymous" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE UNIQUE INDEX "UX_normalized_email" ON "users" ("normalizedEmail") '
    )
    await queryRunner.query('CREATE UNIQUE INDEX "UX_email" ON "users" ("email") ')
    await queryRunner.query('CREATE INDEX "IX_is_anonymous" ON "users" ("isAnonymous") ')
    await queryRunner.query(
      'CREATE UNIQUE INDEX "UX_normalized_username" ON "users" ("normalizedUsername") '
    )
    await queryRunner.query('CREATE UNIQUE INDEX "UX_username" ON "users" ("username") ')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "public"."UX_username"')
    await queryRunner.query('DROP INDEX "public"."UX_normalized_username"')
    await queryRunner.query('DROP INDEX "public"."IX_is_anonymous"')
    await queryRunner.query('DROP INDEX "public"."UX_email"')
    await queryRunner.query('DROP INDEX "public"."UX_normalized_email"')
    await queryRunner.query('DROP TABLE "users"')
  }
}
