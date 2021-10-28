import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, VersionColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at' })
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
