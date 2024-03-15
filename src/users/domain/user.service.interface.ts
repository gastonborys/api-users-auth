import { UserIdentity, UserEntity, UserCreate, UserUpdate, Credentials } from './user.models';

interface IUserService {
    login(credentials: Credentials): Promise<UserIdentity>;
    create(user: UserCreate, identity: UserIdentity): Promise<UserEntity>;
    update(id: string, user: UserUpdate, identity: UserIdentity): Promise<UserEntity>;
    updatePassword(username: string, password: string, identity: UserIdentity): Promise<boolean>;
    get(id: string): Promise<UserEntity>;
    list(): Promise<UserEntity[]>;
    delete(id: string): Promise<void>;
}

export default IUserService;