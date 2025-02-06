import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    heureDeb: Date;

    @Column()
    heureFin: Date;

    @Column()
    salleId: number;
}