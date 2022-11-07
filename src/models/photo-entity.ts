import { Entity, Column, PrimaryGeneratedColumn, OneToOne, Relation } from "typeorm"
import { PhotoMetadata } from "./photo-metadata-entity";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column("text")
    description: string

    @Column()
    filename: string

    @Column("float")
    views: number

    @Column()
    isPublished: boolean

    @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo)
    metadata: Relation<PhotoMetadata>
}