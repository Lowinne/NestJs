import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Film {

    @PrimaryColumn()
    tmdbId: number;

    @Column()
    title: string;

    @Column()
    overview: string;
}