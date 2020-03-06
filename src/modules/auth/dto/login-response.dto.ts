import { IsNotEmpty } from 'class-validator'

export class LoginResponseDto {

	@IsNotEmpty()
	readonly token: string

}