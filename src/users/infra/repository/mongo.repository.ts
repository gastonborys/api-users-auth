import IUserRepository from "../../domain/user.repository";
import { UserCreate, UserCredentials, UserEntity, UserUpdate, UserWithPassword } from "../../domain/user.models";
import { UserModel } from "../model/user.schema";

export class MongoRepository implements IUserRepository {
	constructor() {}

	public async create( user: UserCreate ): Promise<UserEntity> {
		try {
			return (await UserModel.create(user)) as UserEntity;
		}
		catch (error) {
			throw error;
		}
	}

	public async update(id: string, user: UserUpdate): Promise<UserEntity> {
		try {
			await UserModel.updateOne({ _id: id }, user);

			return (await UserModel.findById({ _id: id })) as UserEntity;
		}
		catch (error) {
			throw error;
		}
	}

	public async delete(id: string): Promise<void> {
		try{
			await UserModel.deleteOne({ _id: id });
		}
		catch (error) {
			throw error;
		}
	}

	public async list(): Promise<UserEntity[] | []> {
		try{
			return await UserModel.find();
		}
		catch (error) {
			throw error;
		}
	}

	public async get(id: string): Promise<UserEntity> {
		try{
			return await UserModel.findById({ _id: id }) as UserEntity;
		}
		catch (error) {
			throw error;
		}
	}

	public async getCredentials(username: string): Promise<UserWithPassword> {
		try{
			return await UserModel.findOne({ username }).select(
				'+password'
				) as UserWithPassword;
		}
		catch (error) {
			throw error;
		}
	}
	
	public async changePassword( username: string, user: UserCredentials ): Promise<boolean> {
		try {
			const action = await UserModel.updateOne({ username}, user);

			return action.modifiedCount == 0 ? false : true;

		} catch (error) {
			throw error;
		}
	}

	// Validations 
	public async userExists(username: string): Promise<boolean> {
		try{
			return (await UserModel.findOne({ username }).countDocuments()) > 0 ? true : false;
		}
		catch (error){
			throw error;
		}
	}

	public async accountExists(userData: UserEntity): Promise<boolean> {
		try{
			const response = await UserModel.findOne({ email: userData.email });

			if (userData._id != undefined && response != null) {
				return response._id != userData._id ? true : false;
			}

			if (response != null) return Array.isArray(response) ? true : false;

			return false;
		}
		catch (error) {
			throw error;
		}
	}
}
