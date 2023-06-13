/**
**  _____     _____
** |  _  \   |  _  \    Bela Black
** | |_| |   | |_| |    info@feketebela.hu
** |  __  \  |  __  \   feketebela.hu
** | |__|  | | |__|  |  Node JS Developer
** |______/  |______/   Dunaújváros, 2023.
*
*/
import chalk from 'chalk';
import DateFormatting from './DateFormatting';

export default class ConsoleLog {
    private static inf  = "INFO ⇨"
    private static succ = "SUCCESS ⇨"
    private static war  = "WARNINIG ⇨"
    private static err  = "ERROR ⇨"
    public static log   = (args: any) => this.info(args)
    public static info  = (args: any) => {
        const long = args.length + this.inf.length + 1
        console.log(chalk.blueBright(`${this.writeSeparator(long)}\n\n[${DateFormatting.mediumDateTimeNumeric()}]\n${this.inf}`),
            typeof args === 'string' ? chalk.blueBright(args) : args,
            chalk.blueBright(`\n${this.writeSeparator(long)}\n`)
        )
    }
    public static success   = (args: any) => console.log(
        chalk.greenBright(`${this.writeSeparator(args.length + this.succ.length + 1)}\n\n[${DateFormatting.mediumDateTimeNumeric()}]\n${this.succ}`),
        typeof args === 'string' ? chalk.greenBright(args) : args,
        chalk.greenBright(`\n${this.writeSeparator(args.length + this.succ.length + 1)}\n`)
    )
    public static warning   = (args: any) => console.log(
        chalk.yellowBright(`${this.writeSeparator(args.length + this.war.length + 1)}\n\n[${DateFormatting.mediumDateTimeNumeric()}]\n${this.war}`), 
        typeof args === 'string' ? chalk.yellowBright(args) : args,
        chalk.yellowBright(`\n${this.writeSeparator(args.length + this.war.length + 1)}\n`)
    )
    public static error     = (args: any) => console.log(
        chalk.redBright(`${this.writeSeparator(args.length + this.err.length + 1)}\n\n[${DateFormatting.mediumDateTimeNumeric()}]\n${this.err}`), 
        typeof args === 'string' ? chalk.redBright(args) : args,
        chalk.redBright(`\n${this.writeSeparator(args.length + this.err.length + 1)}\n`)
    )

    private static writeSeparator = (chars: number) => {
        let separator = ""
        let chr = chars < 25 ? 24 : chars
        for (let i = 0; i < chr; ++i) separator += "_"
        return separator
    }

}
