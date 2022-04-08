import {MigrationInterface, QueryRunner} from "typeorm";

export class time1644671099309 implements MigrationInterface {
    name = 'time1644671099309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "battlefield"."unit" ADD "time" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "battlefield"."unit" DROP COLUMN "time"`);
    }

}
