import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ausgaben } from "./Ausgaben";
import { Familienmitglied } from "./Familienmitglied";
import { Laden } from "./Laden";

@Entity("rechnung", { schema: "haushaltsbuch" })
export class Rechnung {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @ManyToOne(type => Laden, laden => laden.id, {eager: true})
  @JoinColumn({name: "laden"})
  @Column("int", { name: "laden", nullable: true })
  laden: Laden | undefined

  @Column("date", { name: "datum", nullable: true })
  datum: Date | undefined

  @Column("int", { name: "einmalig", nullable: true })
  einmalig: number | null | undefined;

  @ManyToOne(type => Familienmitglied, familienmitglied => familienmitglied.id, {eager: true})
  @JoinColumn({name: "person"})
  @Column("int", { name: "person", nullable: true })
  person: Familienmitglied | undefined;

  @OneToMany(type => Ausgaben, ausgaben => ausgaben.rechnungsnr, {eager: true, cascade: ["insert"]})
  //@JoinColumn({name: "rechnungsnr"})
  ausgaben: Ausgaben[] | undefined
}
