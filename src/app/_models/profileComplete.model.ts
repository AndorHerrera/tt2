export class ProfileComplete {
    email:string;
    email_verified:boolean;
    name:string;
    given_name:string;
    family_name:string;
    picture:string;
    gender:string;
    locale:string;
    updated_at:string;
    user_id:string;
    nickname:string;
    identities:Identities;
    created_at:string;
    last_ip:string;
    last_login:string;
    logins_count:number;
}

export class Identities {
    provider:string;
    user_id:string;
    connection:string;
    isSocial:boolean;
}