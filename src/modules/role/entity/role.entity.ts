import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../../shared/base.model';
import { Status } from '../../../shared/status.enum';
import { User } from '../../user/entity/user.entity';

@Entity('role')
export class Role extends BaseModel {
	@PrimaryGeneratedColumn('increment')
	idRole: number;

	@Column({ type: 'varchar', length: 20, nullable: false })
	nombre: string;

	@Column({ type: 'text', nullable: false })
	descripcion: string;

	@Column({ type: 'enum', enum: Status, default: Status.ACTIVO })
	status: Status;

	@ManyToMany(type => User, user => user.roles)
	@JoinColumn()
	users: User[];
}