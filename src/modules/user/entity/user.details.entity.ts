
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../../shared/base.model';
import { Status } from '../../../shared/status.enum';

@Entity('user_detalle')
export class UserDetails extends BaseModel {
	@PrimaryGeneratedColumn('increment')
	idUserDetalle: number;

	@Column({ type: 'varchar', length: 50, nullable: true })
	nombre: string;

	@Column({ type: 'varchar', nullable: true })
	apellido: string;

	@Column({
		type: 'varchar',
		unique: true,
		length: 12,
		nullable: false,
		name: 'dni',
	})
	dni: string;

	@Column({
		type: 'varchar',
		unique: true,
		length: 15,
		nullable: false,
		name: 'telefono',
	})
	telefono: string;


	@Column({ type: 'timestamp', name: 'fecha_nac', nullable: true })
	fechaNac: Date;

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.ACTIVO,
	})
	status: Status;
}