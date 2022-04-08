import {MigrationInterface, QueryRunner} from "typeorm";

export class init1642267349649 implements MigrationInterface {
    name = 'init1642267349649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "armory"."attribute" ("id" uuid NOT NULL, "address" character varying NOT NULL, "is3d" boolean NOT NULL DEFAULT false, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "armory"."unit" ("id" uuid NOT NULL, "accountId" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "points" bigint NOT NULL DEFAULT '0', "isMint" boolean NOT NULL DEFAULT true, "is3d" boolean NOT NULL DEFAULT false, "rank" bigint NOT NULL DEFAULT '0', "data_uri" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "armory"."unit"`);
        await queryRunner.query(`DROP TABLE "armory"."attribute"`);
    }

}
