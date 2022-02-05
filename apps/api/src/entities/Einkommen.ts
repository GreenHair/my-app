import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Familienmitglied } from "./Familienmitglied";

@Entity("einkommen", { schema: "haushaltsbuch" })
export class Einkommen {
  @PrimaryGeneratedColumn({ type: "int", name: "nr" })
  nr: number;

  @Column("date", { name: "datum", nullable: true })
  datum: Date

  @Column("varchar", { name: "bezeichnung", nullable: true, length: 60 })
  bezeichnung: string | null;

  @ManyToOne(type => Familienmitglied, familienmitglied => familienmitglied.id, { eager: true })
  @JoinColumn({name: "person"})
  @Column("int", { name: "person", nullable: true })
  person: Familienmitglied;

  @Column("double", { name: "betrag", nullable: true, precision: 22 })
  betrag: number | null;
}
