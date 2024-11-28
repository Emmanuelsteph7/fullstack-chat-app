import bcrypt from "bcryptjs";

const comparePassword = async (password: string, passwordFromDB: string) => {
  return await bcrypt.compare(password, passwordFromDB);
};

export default comparePassword;
