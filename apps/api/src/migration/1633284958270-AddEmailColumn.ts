import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEmailColumn1633284958270 implements MigrationInterface {
    name = 'AddEmailColumn1633284958270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`users\` ADD \`email\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`ausgaben\` CHANGE \`prod_gr\` \`prod_gr\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`ausgaben1\` CHANGE \`prod_gr\` \`prod_gr\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`einkommen\` CHANGE \`person\` \`person\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`familienmitglied\` CHANGE \`ID\` \`ID\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`japan\` CHANGE \`person\` \`person\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`produktgruppe\` CHANGE \`ID\` \`ID\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung\` CHANGE \`einmalig\` \`einmalig\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung\` CHANGE \`person\` \`person\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung1\` CHANGE \`einmalig\` \`einmalig\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung1\` CHANGE \`person\` \`person\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_328f3ef4511b040d069d057b5e\` ON \`haushaltsbuch\`.\`laden\` (\`name\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`haushaltsbuch\`.\`users\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`haushaltsbuch\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_328f3ef4511b040d069d057b5e\` ON \`haushaltsbuch\`.\`laden\``);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung1\` CHANGE \`person\` \`person\` int(1) NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung1\` CHANGE \`einmalig\` \`einmalig\` int(1) NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung\` CHANGE \`person\` \`person\` int(1) NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`rechnung\` CHANGE \`einmalig\` \`einmalig\` int(1) NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`produktgruppe\` CHANGE \`ID\` \`ID\` int(2) NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`japan\` CHANGE \`person\` \`person\` int(1) NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`familienmitglied\` CHANGE \`ID\` \`ID\` int(1) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`einkommen\` CHANGE \`person\` \`person\` int(1) NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`ausgaben1\` CHANGE \`prod_gr\` \`prod_gr\` int(2) NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`ausgaben\` CHANGE \`prod_gr\` \`prod_gr\` int(2) NULL`);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`haushaltsbuch\`.\`users\` DROP COLUMN \`email\``);
    }

}
