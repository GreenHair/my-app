import { BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt"

@Index("USER_NAME", ["name"], { unique: true })
@Entity("users", { schema: "haushaltsbuch" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "uid" })
  uid: number;

  @Column("varchar", { name: "name", unique: true, length: 20 })
  name: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string

  @BeforeInsert()
  async hashPassword() { 
    this.password = await bcrypt.hash(this.password, 10)
  }
}
