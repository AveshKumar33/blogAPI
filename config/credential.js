require('dotenv').config();
const config={
    port:process.env.PORT,
    mongouri:process.env.mongo_DB_url,
    blogger_secret_key:process.env.BLOGGER_SECRET_KEY,
    secret_key:process.env.SECRET_KEY
};
module.exports=config;