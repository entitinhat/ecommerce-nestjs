import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: 'roles can not be empty.' })
  @IsEnum(Roles, { each: true, message: 'Valid role required' })
  roles: Roles[];
}
