import {MigrationInterface, QueryRunner} from "typeorm";

export class init1644413949808 implements MigrationInterface {
    name = 'init1644413949808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "battlefield"."unit" ("id" character varying NOT NULL, "account_id" character varying NOT NULL, "release_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "battlefield"."unit"`);
    }

}
