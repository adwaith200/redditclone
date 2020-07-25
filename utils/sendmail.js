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
            host:'smtp.mailtrap.io',
            port:'25',
            auth:{
                user:'d9426025f171cb',
                pass:'ea2041dcf458c6'
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