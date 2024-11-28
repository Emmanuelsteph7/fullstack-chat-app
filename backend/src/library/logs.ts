/* eslint-disable @typescript-eslint/no-explicit-any */
const chalkInstance = async () => (await import("chalk")).default;

class Logging {
  public static info = async (args: any) => {
    const chalk = await chalkInstance();
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === "string" ? chalk.blueBright(args) : args
    );
  };

  public static warn = async (args: any) => {
    const chalk = await chalkInstance();
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`),
      typeof args === "string" ? chalk.yellowBright(args) : args
    );
  };

  public static error = async (args: any) => {
    const chalk = await chalkInstance();
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [ERROR]`),
      typeof args === "string" ? chalk.redBright(args) : args
    );
  };
}

export default Logging;
