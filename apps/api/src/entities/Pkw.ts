import { Column, Entity } from "typeorm";

@Entity("pkw", { schema: "haushaltsbuch" })
export class Pkw {
  @Column("int", { primary: true, name: "ID" })
  id: number;

  @Column("double", { name: "KM", nullable: true, precision: 22 })
  km: number | null;

  @Column("double", { name: "verbrauch", nullable: true, precision: 22 })
  verbrauch: number | null;

  @Column("varchar", { name: "bemerkungen", nullable: true, length: 100 })
  bemerkungen: string | null;
}
