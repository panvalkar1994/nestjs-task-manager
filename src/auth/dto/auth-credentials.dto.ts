import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

/**
 * password valid pattern:
 * Passwords will contain at least 1 upper case letter
 * Passwords will contain at least 1 lower case letter
 * Passwords will contain at least 1 number or special character
 * There is no length validation (min, max) in this regex!
 */
const passwordStringRegex =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(passwordStringRegex, {
    message:
      'Password should contain, at least 1 uppercase letter, 1 lowercase letter, 1 special character or number',
  })
  password: string;
}
