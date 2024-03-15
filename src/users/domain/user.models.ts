export interface Credentials {
	username	: string;
	password	: string;
}

export interface UserBase{
    username		: string;
    email           : string;
    enabled         : boolean;
    isadmin         : boolean;
    name            : string;
    lastname        : string;
    phone           : string;

}

export interface UserTimeCreated{
    created_by      : string;
    created_at		: Date;
}

export interface UserTimeUpdated{
    updated_at      : Date;
    updated_by      : string;
}
export interface UserCreate extends UserBase, UserTimeCreated, UserTimeUpdated{
    password		: string;
}

export interface UserUpdate extends UserBase{
    _id	          : string;
}

export interface UserEntity extends UserBase, UserTimeCreated, UserTimeUpdated, UserUpdate {}

export interface UserWithPassword extends UserCreate{
	_id	: string;	
}

export interface UserCredentials extends Credentials {
	updated_by	: string;
	updated_at	: Date;
}

export interface UserIdentity {
    user        : string;
    name        : string;
    lastname    : string;
    email       : string;
    isadmin     : boolean;
    iat         : number;
    exp         : number;
    token?      : string;
}