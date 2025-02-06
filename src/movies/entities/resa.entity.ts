import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Resa {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    seanceId: string;
}