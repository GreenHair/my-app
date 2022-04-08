import { Rechnung } from "./Rechnung";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produktgruppe } from "./Produktgruppe";

@Entity("ausgaben", { schema: "haushaltsbuch" })
export class Ausgaben {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "bezeichnung", nullable: true, length: 60 })
  bezeichnung: string | null;

  @Column("double", {
    name: "betrag",
    nullable: true,
    precision: 22,
    default: () => "'0'",
  })
  betrag: number | null;

  @Column("int", { name: "prod_gr", nullable: true })
  @ManyToOne(type => Produktgruppe, produktgruppe => produktgruppe.id, {eager: true})
  @JoinColumn({ name: "prod_gr", referencedColumnName: "id" })
  prodGr: Produktgruppe;

  @Column("int", { name: "rechnungsnr", nullable: true })
  @ManyToOne(type => Rechnung, rechnung => rechnung.id, { cascade: true, onDelete: "CASCADE"})
  @JoinColumn({name: "rechnungsnr", referencedColumnName: "id"})
  rechnungsnr: Rechnung;
}
