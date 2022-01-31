import { Column, Entity } from "typeorm";

@Entity("familienmitglied", { schema: "haushaltsbuch" })
export class Familienmitglied {
  @Column("int", { primary: true, name: "ID" })
  id!: number;

  @Column("varchar", { name: "vorname", nullable: true, length: 20 })
  vorname: string | undefined;

  @Column("varchar", { name: "nachname", nullable: true, length: 20 })
  nachname: string | undefined;
}
