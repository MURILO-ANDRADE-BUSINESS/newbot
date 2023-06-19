import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createDailyReportsPrime1686539599431
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'daily_reports_prime',
                columns: [
                    { name: 'id', type: 'serial', isPrimary: true },

                    { name: 'date', type: 'timestamp' },

                    { name: 'greens', type: 'integer' },

                    { name: 'reds', type: 'integer' },

                    { name: 'total', type: 'integer' },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('daily_reports_prime');
    }
}
