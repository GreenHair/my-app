import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rechnung1", { schema: "haushaltsbuch" })
export class Rechnung1 {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("int", { name: "laden", nullable: true })
  laden: number | null | undefined;

  @Column("date", { name: "datum", nullable: true })
  datum: string | null | undefined;

  @Column("int", { name: "einmalig", nullable: true })
  einmalig: number | null | undefined;

  @Column("int", { name: "person", nullable: true })
  person: number | null | undefined;
}
