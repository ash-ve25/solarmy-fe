import {MigrationInterface, QueryRunner} from "typeorm";

export class reward1644865429476 implements MigrationInterface {
    name = 'reward1644865429476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "battlefield"."unit" ADD "reward" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "battlefield"."unit" DROP COLUMN "reward"`);
    }

}
