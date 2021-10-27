import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, VersionColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @VersionColumn({ default: 1 })
    version: number

    @Column()
    email: string

    @Column()
    password: string

    get isDeleted(): boolean {
        return this.deletedAt != null
    }
}
