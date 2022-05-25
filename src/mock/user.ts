export const auth = ()=> {
    return   {
        status: true,
        message: "LOGIN_SUCCESS",
        data:{
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzlhMGRiOS04ZDVjLTNlMjEtODEzMS1hOWJkNDc1NGJmZDkiLCJyb2xlIjoiU1RVREVOVCIsInByb3ZpZGVyIjoiU1RVREVOVCIsImV4cCI6MTU4MTM2OTQzMH0.lKYQFM_-0JhN-7uIBcpiLsofz5vEQiQtuNZfftoLASu11YAX9HGLXPI6dnQKDaVx_3C_UaHKEazvEr7BBpotMA",
            }
        }
}

export const getUser =()=> {
    return{
        status: true,
        message: "LIST_SUCCESS" ,
        data:{
            dataUser:{
            business_name: "Mark",
            description: "ExamplessName",
            youtube:  "https://youtue.com",
            facebook:  "https://facebook.com",
            linkedin: "https://linkedin.com",
            web: "https://usergit.com",
            phone: "",
            genere: "H",
            state: true,
            ruc: "q24",
            brithday_date: "1652856264",
        },
         rol: 2}
    }
}
