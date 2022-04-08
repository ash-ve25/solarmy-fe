import {MigrationInterface, QueryRunner} from "typeorm";

export class init1640019298012 implements MigrationInterface {
    name = 'init1640019298012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blockchain"."transaction" ("id" character varying NOT NULL, "data" json NOT NULL, "isSent" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blockchain"."transaction"`);
    }

}
