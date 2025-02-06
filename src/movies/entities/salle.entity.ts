import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Salle {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    capacity: number;

    @Column()
    filmId: number;
}