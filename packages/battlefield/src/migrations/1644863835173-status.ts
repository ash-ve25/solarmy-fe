import {MigrationInterface, QueryRunner} from "typeorm";

export class status1644863835173 implements MigrationInterface {
    name = 'status1644863835173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "battlefield"."unit" ADD "status" character varying NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "battlefield"."unit" DROP COLUMN "status"`);
    }

}
