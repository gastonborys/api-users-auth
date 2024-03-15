import { UserCreate, UserCredentials, UserEntity, UserUpdate, UserWithPassword } from "./user.models";


export default interface IUserRepository {
    
    create(user: UserCreate): Promise<UserEntity>;

    update(id: string, user: UserUpdate): Promise<UserEntity>;
    
    delete(id: string): Promise<void>;
    
    get(id: string): Promise<UserEntity>;
    
    getCredentials(id: string): Promise<UserWithPassword>;

    changePassword(email: string, user: UserCredentials): Promise<boolean>;
    
    list(order?: Object): Promise <UserEntity[] | []>;

    accountExists(userData: UserUpdate): Promise<boolean>;

    userExists(username: string): Promise<boolean>;
    
}
