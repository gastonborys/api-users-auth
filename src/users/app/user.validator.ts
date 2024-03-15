import Validator from "validatorjs";
import { ValidationResult, ValidationRules, ValidationMessages } from "../../shared/interfaces";
import { Credentials, UserCreate, UserUpdate, UserWithPassword } from "../domain/user.models";
import IUserRepository from '../domain/user.repository';
import IUserValidator from "../domain/user.validator.interface";

export class UserValidator implements IUserValidator {
	
	constructor( private userRepository: IUserRepository){}
	public async validateUserCreate( data: UserCreate ): Promise<ValidationResult> {
		let rules: ValidationRules = {
			name		: "required|string",
			lastname	: "string",
			username	: "required|string|min:6|^[a-zA-Z]+$",
			email	: "required|email",
			password	: "required|string|min:9|regex:/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[+@$#%&_-])/",
			enabled	: "required|boolean",
			isadmin	: "required|boolean",
		};

		let message: ValidationMessages = {
			required	: "Field :attribute is required",
			min		: "Field :attribute necesita como mínimo :min caracteres",
			boolean	: "Field :attribute debe tener un valor booleano [true o false], [2 o 0]",
			email	: "Field :attribute debe ser un email válido",
			regex	: "Field :attribute necesita como mínimo una letra minúscula, una mayúscula, un número y un caracter especial entre [+@$#%&_-]",
		};

		return this.validateUser({ data, rules, messages: message });

	}

	public async validateUserUpdate(data: UserUpdate): Promise<ValidationResult> {

		let rules: ValidationRules = {
			username	: "string|min:6|^[a-zA-Z]+$",
			email	: "email",
			password	: "string|min:9|regex:/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[+@$#%&_-])/",
			enabled	: "boolean",
			isadmin	: "boolean",
		};

		let message: ValidationMessages = {
			min		: "Field :attribute necesita como mínimo :min caracteres",
			boolean	: "Field :attribute debe tener un valor booleano [true o false], [2 o 0]",
			email	: "Field :attribute debe ser un email válido",
			regex	: "Field :attribute necesita como mínimo una letra minúscula, una mayúscula, un número y un caracter especial entre [+@$#%&_-]",
		};

		let validFields: ValidationResult = await this.validateUser({ data, rules, messages: message });

		if (!validFields.result)
			return validFields;

		
		if (await this.userRepository.accountExists(data))
			validFields = {
				result	: false,
				message	: `Account ${data.username} already exists`,
			}
		
		return validFields;
	}

	public async isValidUserAndPassword( username: string, password: string): Promise<ValidationResult> {

		let isValid: ValidationResult = { 
			result: true,
			message: "",
		};

		let data: Credentials = {
			username,
			password,
		};

		let rules : ValidationRules = {
			username	: "required|string|min:6|^[a-zA-Z]+$",
			password	: "required|string|min:9|regex:/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[+@$#%&_-])/",
		};

		let message: ValidationMessages = {
			"username.required"	: "El campo :attribute es obligatorio.",
			"username.string"	: "El campo :attribute debe ser una cadena de texto.",
			"username.min"		: "El campo :attribute debe tener al menos :min caracteres.",
			"username.regex"	: "El campo :attribute debe contener solo letras.",
			"password.required"	: "El campo :attribute es obligatorio.",
			"password.string"	: "El campo :attribute debe ser una cadena de texto.",
			"password.min"		: "El campo :attribute debe tener al menos :min caracteres.",
			"password.regex"	: "El campo :attribute debe cumplir con los requisitos de seguridad.",
		};

		isValid = await this.validateUser({ data, rules, messages: message });

		if (!isValid.result)
			return isValid;

		
		if (!await this.userRepository.userExists(data.username))
			isValid = {
				result	: false,
				message	: `El username ${data.username} no existe en la base de datos`,
			};

		return isValid;
	}

	public validateCredentials(user: UserWithPassword, credentials: Credentials): ValidationResult {
		let  isValid: ValidationResult = {
			result	: true,
			message	: "",
		};

		const { username, password } = credentials;

		if (
			username === user.username &&
			password === user.password &&
			user.enabled === true
		)
			return isValid;
		
		isValid.result = false;
		isValid.message = "Credenciales incorrectas";

		return isValid;
	}

	private async validateUser({ data, rules, messages }: { data: UserCreate | UserUpdate | Credentials; rules: ValidationRules; messages: ValidationMessages; }): Promise<ValidationResult> {
		const isValid: ValidationResult = { 
			result	: true, 
			message	: "" 
		};

		const validation = new Validator(data, rules, messages);

		if (validation.fails()) {
			isValid.result = false;
			isValid.message = JSON.stringify(validation.errors.all());
		}

		return isValid;
	}
}