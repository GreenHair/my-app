import {MigrationInterface, QueryRunner} from "typeorm";

export class longPassword1633883634523 implements MigrationInterface {
    name = 'longPassword1633883634523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`users\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`users\` ADD \`password\` varchar(40) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
    }

}
