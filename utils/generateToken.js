import { randomBytes, createCipheriv } from "crypto";
import generateApiKey from "generate-api-key";

const generateToken = () =>{
    var token = generateApiKey();
    return String(token)   
}


const hashToken = (token)=>{
    const algorithm = "aes-256-cbc"; 
    const initVector = process.env.INIT_VECTOR || '0000000000000000';
    const message = token;
    const Securitykey = process.env.DEVELOPER_SECRET || 'a54762edb437be644d699ff7c5d6235c'
    const cipher = createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData
}

export {generateToken, hashToken}