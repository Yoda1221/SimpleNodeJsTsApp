/**
**  _____     _____
** |  _  \   |  _  \    Bela Black
** | |_| |   | |_| |    info@feketebela.hu
** |  __  \  |  __  \   feketebela.hu
** | |__|  | | |__|  |  Node JS Developer
** |______/  |______/   Dunaújváros, 2023.
*
*/
export default class DateFormatting {
    private static date: Date

    //  FROMAT: YYYMMDD
    public static sortDate = () => {
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(this.date)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(this.date)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(this.date)

        return`${ye+mo+da}`
    }

    //  FORMAT: YYY. MM. DD. HH:MM:SS
    public static mediumDateTimeNumeric = () => {
        this.date   = new Date(new Date())
        const df    = new Intl.DateTimeFormat("hu-HU", { 
            year: 'numeric', month: '2-digit', day: '2-digit', 
            hour: '2-digit', minute: '2-digit', second: '2-digit'
            //dateStyle: "short",timeStyle: "medium"
        })
        .format(this.date) // full, long, medium, short
        
        return df
    }

    private static addZero = (n: any) => { return (parseInt(n, 10) < 10 ? '0' : '') + n }
    //  FORMAT: YYY-MM-DD
    public static mediumDateNumeric = (date: Date) => {
        const dt    = new Date(date)
        const dat   = dt.getDate()
        const month = dt.getMonth()
        const year  = dt.getFullYear()    
        const dateString = year + "-" + this.addZero(month + 1) + "-" + this.addZero(dat)

        return dateString
    }

    public static timestamp = (date: Date) => {
        console.log(Math.floor(new Date(date).getTime() / 1000))
        return Math.floor(new Date(date).getTime() / 1000)
    }


}
