import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../../shared/base.model';
import { Status } from '../../../shared/status.enum';
import { Role } from '../../role/entity/role.entity';
import { UserDetails } from './user.details.entity';


@Entity('user')
export class User extends BaseModel {
	@PrimaryGeneratedColumn('increment')
	idUser: number;

	@Column({
		type: 'varchar',
		unique: true,
		length: 100,
		nullable: false,
		name: 'email',
	})
	email: string;

	@Column({ type: 'varchar', nullable: false })
	password: string;

	@ManyToMany(type => Role, role => role.users, { eager: true })
	@JoinTable({ name: 'user_roles' })
	roles: Role[];

	@OneToOne(type => UserDetails, {
		cascade: true,
		nullable: false,
		eager: true,
	})
	@JoinColumn({ name: 'detalle_id' })
	detalle: UserDetails;

	@Column({
		type: 'enum',
		enum: Status,
		default: Status.ACTIVO,
	})
	status: Status;
}