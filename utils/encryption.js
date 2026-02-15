const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256")
    .update(process.env.JWT_SECRET)
    .digest();

exports.encryptFile = (buffer) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return { encrypted, iv: iv.toString("hex") };
};

exports.decryptFile = (encryptedBuffer, ivHex) => {
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
        decipher.update(encryptedBuffer),
        decipher.final()
    ]);
    return decrypted;
};
