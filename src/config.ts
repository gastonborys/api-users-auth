export const config = {
    server: {
        port        : process.env.PORT || 3000,
    },
    mongo: {
        server      : process.env.MONGO_SERVER,
        mongou      : process.env.MONGO_USER,
        mongop      : process.env.MONGO_PASS,
        db          : process.env.MONGO_DB,
    },
    email:{
        smtp_port   : process.env.EMAIL_SMTP_PORT,
        smtp_host   : process.env.EMAIL_SMTP_HOST,
        smtp_user   : process.env.EMAIL_SMTP_USER,
        smtp_pass   : process.env.EMAIL_SMTP_PASS,
        smtp_from_n : process.env.EMAIL_SMTP_FROM_NAME,
        smtp_from_a : process.env.EMAIL_SMTP_FROM_ADDRESS,
    },
    jwt : {
        key         : process.env.JWT_KEY,
    },
};
