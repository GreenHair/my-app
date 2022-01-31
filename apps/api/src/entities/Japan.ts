import { Column, Entity } from "typeorm";

@Entity("japan", { schema: "haushaltsbuch" })
export class Japan {
  @Column("int", { primary: true, name: "ID" })
  id!: number;

  @Column("varchar", { name: "bezeichnung", nullable: true, length: 60 })
  bezeichnung: string | undefined;

  @Column("varchar", { name: "laden", nullable: true, length: 40 })
  laden: string | undefined;

  @Column("double", { name: "betrag", nullable: true, precision: 22 })
  betrag: number | undefined;

  @Column("tinyint", { name: "essen", nullable: true, width: 1 })
  essen: boolean | undefined;

  @Column("tinyint", { name: "geschenk", nullable: true, width: 1 })
  geschenk: boolean | undefined;

  @Column("int", { name: "person", nullable: true })
  person: number | undefined;

  @Column("date", { name: "date", nullable: true })
  date: string | undefined;
}
