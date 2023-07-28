import * as bcrypt from  'bcrypt';

export const genrateSalt = async ()=>{
    return await bcrypt.genSalt()
}

export const genratePassword = async (password :string , salt: string) => {
    return await bcrypt.hash(password , salt);
}