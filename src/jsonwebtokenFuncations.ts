import {sign} from "jsonwebtoken";
import { Document } from "mongoose";

export function issueTocken(user:Document<unknown, {}, {
    userNameStore?: string | null | undefined;
    passwordStore?: string | null | undefined;
    emailStore?: string | null | undefined;
}>){
    const _id=user._id;

    const expiringDate="1d";

    const jwt_payload={
        sub:_id,
        dateOfCreation:Date.now()
    }

    const token=sign(jwt_payload,process.env.JWT_SECRET || 'your_jwt_secret',{expiresIn:expiringDate});

    return {
        tokenWithBearer:"Bearer "+token,
        expiringDate
    }
}