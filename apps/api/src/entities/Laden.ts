import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("UniqueName", ["name"], { unique: true })
@Entity("laden", { schema: "haushaltsbuch" })
export class Laden {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 20 })
  name: string;

  @Column("tinyint", {
    name: "online",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  online: boolean | null;
}
