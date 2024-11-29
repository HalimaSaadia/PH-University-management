import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(process.cwd(),".env")})
export default {
    db_url: process.env.DATABASE_URL,
    port:process.env.PORT,
    default_password: process.env.DEFAULT_PASS,
    salt:process.env.HAST_SALT
}