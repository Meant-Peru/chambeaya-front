export default interface User{
    email : string;
    password ?: string;
    name ?: string;
    lastName ?: string;
    phone: string;
    rolUser ?: string;
    sex ?: string;
    birthDayDate ?: Date;

    businessName ?: string;
    ruc ?: string;
    description ?: string;

    youtube ?: string;
    facebook ?: string;
    linkedin ?: string;
    web ?: string;
}

export interface UserCompanyDetail{
    dataUser: {
        youtube: string,
        business_name : string,
        ruc: string,
        web: string,
        phone: string,
        facebook: string,
        description: string,
        linkedin: string,
        state: Boolean
    },
    rol: string,
    email: string
}