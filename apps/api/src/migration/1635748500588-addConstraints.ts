import {MigrationInterface, QueryRunner} from "typeorm";

export class addConstraints1635748500588 implements MigrationInterface {
    name = 'addConstraints1635748500588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung\` ADD CONSTRAINT \`FK_8ac0f369352db369e847b05ed1e\` FOREIGN KEY (\`laden\`) REFERENCES \`haushaltsbuch\`.\`laden\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung\` ADD CONSTRAINT \`FK_add0c6a7292ece7b018f208423f\` FOREIGN KEY (\`person\`) REFERENCES \`haushaltsbuch\`.\`familienmitglied\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`ausgaben\` ADD CONSTRAINT \`FK_4cde71ce880067881be7517e6dd\` FOREIGN KEY (\`prod_gr\`) REFERENCES \`haushaltsbuch\`.\`produktgruppe\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`ausgaben\` ADD CONSTRAINT \`FK_0acf97ab2954ce9b2dde6eb54fc\` FOREIGN KEY (\`rechnungsnr\`) REFERENCES \`haushaltsbuch\`.\`rechnung\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`ausgaben\` DROP FOREIGN KEY \`FK_0acf97ab2954ce9b2dde6eb54fc\``);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`ausgaben\` DROP FOREIGN KEY \`FK_4cde71ce880067881be7517e6dd\``);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung\` DROP FOREIGN KEY \`FK_add0c6a7292ece7b018f208423f\``);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung\` DROP FOREIGN KEY \`FK_8ac0f369352db369e847b05ed1e\``);
    }

}
