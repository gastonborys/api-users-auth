import sha1 from "js-sha1";

import IUserService from "../domain/user.service.interface";
import { UserIdentity, UserEntity, Credentials, UserCreate, UserUpdate, UserCredentials, UserWithPassword } from "../domain/user.models";
import { Jwt } from "../infra/libs/jwt";
import IUserValidator from "../domain/user.validator.interface";
import IUserRepository from "../domain/user.repository";

export class UserService implements IUserService{

	constructor(
		private userRepository: IUserRepository,
		private userValidator: IUserValidator,
		) {}

	public async login(credentials: Credentials): Promise<UserIdentity> {

		// hasheamos la contraseña
		const hashedPassword = sha1(credentials.password);

		// preparo las credenciales con el password hasheado
		credentials = {
			...credentials,
			password: hashedPassword,
		};

		// obtenemos las credenciales para luego validar
		const userData: UserWithPassword = await this.userRepository.getCredentials(credentials.username);

		// en caso de no existir error
		if (!userData) {
			throw new Error('User / password incorrect or account is disabled');
		}
		
		// validamos las credenciales para ver si son correctas
          const isValididCredentials  = this.userValidator.validateCredentials(userData, credentials)

		if (!isValididCredentials.result) {
			throw new Error(isValididCredentials.message);
		}

		// Con todo ok generamos el token
		const jwt = new Jwt();
		return jwt.createToken(userData);
	}

	public async create ( user: UserCreate, identity: UserIdentity ): Promise<UserEntity> {
		
		try{
			// Validamos los campos para crear un usuario
			const validation = await this.userValidator.validateUserCreate(user);

			if (!validation.result) 
				throw new Error(JSON.stringify(validation))

			// Hasheamos la contraseña y marcamos la actividad
			const newUser = {
				...user,
				password 		: sha1(user.password),
				created_by	: `${identity.name} ${identity.lastname}`,
				created_at	: new Date(),
				updated_by	: `${identity.name} ${identity.lastname}`,
				updated_at	: new Date(),
			};

			// creamos el usuario
			return await this.userRepository.create(newUser);
		}
		catch (error) {
			throw error;
		}
	}

	public async update( id: string, user: UserUpdate, identity: UserIdentity ): Promise<UserEntity> {
		try{
			// Validamos los campos para modificar un usuario
			const validation = await this.userValidator.validateUserUpdate(user);

			if (!validation.result) throw new Error(JSON.stringify(validation));

			// Marcamos la actividad
			const updatedUser = {
				...user,
				updated_by	: `${identity.name} ${identity.lastname}`,
				updated_at	: new Date(),
			};

			return await this.userRepository.update(id, updatedUser);
		}
		catch (error) {
			throw error;
		}
	}

	public async updatePassword( username: string, password: string, identity: UserIdentity ): Promise<boolean> {
		try{
               // Validaciones para cambiar la contraseña
			const validation = await this.userValidator.isValidUserAndPassword(username, password);

			if (!validation.result) throw new Error(JSON.stringify(validation));

               // Generamos los datos para cambiar la contraseña y marcamos la actividad
			const data: UserCredentials = {
				username,
				password		: sha1(String(password)),
				updated_by	: `${identity.name} ${identity.lastname}`,
				updated_at	: new Date(),
			};

               // Devolemos true o false
			return await this.userRepository.changePassword(username, data) ? true : false;
		}
		catch (error) {
			throw error;
		}
	}

	public async get(id: string) {
		try{
               return await this.userRepository.get(id);
		}
          catch (error) {
               throw error;
          }
	}

	public async list() {
          try{
		     return await this.userRepository.list();
          }
          catch (error) {
               throw error;
          }
	}

	public async delete(id: string): Promise<void> {
          try{
               return await this.userRepository.delete(id);
          }
          catch (error) {
               throw error;
          }
	}
}