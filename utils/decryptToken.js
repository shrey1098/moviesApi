import { createDecipheriv } from "crypto";

const decryptToken = (encryptedToken) =>{
    const algorithm = "aes-256-cbc";
    const SecurityKey = process.env.DEVELOPER_SECRET || 'a54762edb437be644d699ff7c5d6235c';
    const initVector = process.env.INIT_VECTOR || '0000000000000000';
    console.log("securityKey:"+ SecurityKey+ "initVector:"+ initVector)
    const decipher = createDecipheriv(algorithm, SecurityKey, initVector);
    let decryptedData = decipher.update(encryptedToken, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData
}

export {decryptToken}