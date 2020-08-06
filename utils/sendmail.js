const nodemailer=require('nodemailer');

class EMAIL{
    constructor(user,url){
        this.to=user.email;
        this.from='ADWAITH <adwaith@gmail.com>';
        this.url=url
    }
    newtransport()
    {
        return nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.GMAIL_USERNAME,
                pass:process.env.GMAIL_PASSWORD
            }
        });
    }
    async sendmail(subject)
    {
        const options={
            from:this.from,
            to:this.to,
            subject,
            text:this.url
        }
        await this.newtransport().sendMail(options);
    }
    async passwordreset()
    {
        await this.sendmail('Your password reset');
    }
}

module.exports=EMAIL;