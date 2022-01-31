import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("produktgruppe", { schema: "haushaltsbuch" })
export class Produktgruppe {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id!: number;

  @Column("varchar", { name: "bezeichnung", nullable: true, length: 20 })
  bezeichnung: string | undefined;

  @Column("tinyint", { name: "essen", width: 1 })
  essen: boolean | undefined;
}
