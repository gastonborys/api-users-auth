import { ValidationResult } from '../../shared/interfaces';
import { UserCreate, UserUpdate, Credentials, UserWithPassword } from './user.models';

interface IUserValidator {

	validateUserCreate( data: UserCreate ): Promise<ValidationResult>;

	validateUserUpdate(data: UserUpdate): Promise<ValidationResult>;
	
	isValidUserAndPassword( username: string, password: string): Promise<ValidationResult>;
	
	validateCredentials(user: UserWithPassword, credentials: Credentials): ValidationResult;
}

export default IUserValidator;