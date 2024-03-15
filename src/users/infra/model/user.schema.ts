import mongoose, { Schema } from "mongoose";
import { UserWithPassword } from "../../domain/user.models";

export const UserModel = mongoose.model('users', 
    new Schema<UserWithPassword>({
        username    : { type: String,   index: true },
        email       : { type: String,   index: true },
        password    : { type: String,   select: false},
        enabled     : { type: Boolean,  default: false, index: true },
        isadmin     : { type: Boolean,  default: false, index: true },    
        name        : { type: String,   required: true },
        lastname    : { type: String,   required: true },
        phone       : { type: String,   default: "N/D" },
        created_at  : { type: Date,     default: Date.now() },
        created_by  : { type: String,   default: "register"},
        updated_at  : { type: Date,     default: Date.now()},
        updated_by  : { type: String,   default: "register" },
    })
);
