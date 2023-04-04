import chalk from "chalk";

export const minutes = (n: number) => n * 60 * 1000;

export class Log {
  static info(msg: string) {
    Log.log(msg, chalk.yellow);
  }

  private static log(msg: string, print: (msg: string) => void) {
    const width = msg.length + 8;
    console.log(print("#".repeat(width)));
    console.log(print("### " + msg + " ###"));
    console.log(print("#".repeat(width)));
  }
}
