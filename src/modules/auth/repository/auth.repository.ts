import { genSalt, hash } from 'bcryptjs';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Role } from '../../role/entity/role.entity';
import { RoleRepository } from '../../role/repository/role.repository';
import { RoleType } from '../../role/role.enum';
import { UserDetails } from '../../user/entity/user.details.entity';
import { User } from '../../user/entity/user.entity';
import { RegistroDto } from '../dto/registro.dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
	async register(registroDto: RegistroDto) {
		const { email, dni, telefono, password, nombre, apellido, fechaNac } = registroDto;

		// SE CREA NUEVO USER
		const user = new User();

		user.email = email;

		const roleRepository: RoleRepository = await getConnection().getRepository(
			Role,
		);

		const defaultRole: Role = await roleRepository.findOne({
			where: { nombre: RoleType.CLIENTE },
		});

		user.roles = [defaultRole];

		// SE CREA NUEVO DETALLE DE USUARIO
		const details = new UserDetails();

		details.nombre = nombre;
		details.dni = dni;
		details.apellido = apellido;
		details.telefono = telefono;
		details.fechaNac = fechaNac;
		user.detalle = details;

		// ENCRIPTAMOS LA CONTRASEÑA
		const salt = await genSalt(10);
		user.password = await hash(password, salt);

		await user.save();
	}
}