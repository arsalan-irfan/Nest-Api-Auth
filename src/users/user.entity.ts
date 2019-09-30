import { Entity, Column, PrimaryGeneratedColumn,PrimaryColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    userId:number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 500 })
    email: string;

    @Column({ length: 500 })
    password: string;
}