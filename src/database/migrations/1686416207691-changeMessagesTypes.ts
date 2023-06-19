import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeMessagesTypes1686416207691 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE messages CHANGE COLUMN text text json NOT NULL ;`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MESSAGES" DROP COLUMN "TEXT"`);
    }
}
