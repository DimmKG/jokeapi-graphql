import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, VersionColumn } from 'typeorm'

@Entity('refresh_tokens')
export class RefreshTokenEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @VersionColumn({ default: 1 })
    version: number
    
    @Column()
    userId: string

    @Column()
    token: string

    @Column()
    expiresAt: Date

    get isDeleted(): boolean {
        return this.deletedAt != null
    }
}
