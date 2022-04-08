import {MigrationInterface, QueryRunner} from "typeorm";

export class rarity1644090204703 implements MigrationInterface {
    name = 'rarity1644090204703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "armory"."unit_rarity" ("id" character varying NOT NULL, "is2d" boolean NOT NULL, "data" json NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_79bb83b2c486d62074e181e3afe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "armory"."unit_rarity"`);
    }

}
