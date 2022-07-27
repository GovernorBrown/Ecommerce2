import React, {useRef} from "react"
//import emailjs from "emailjs-com"


const ContactScreen = () =>{
    
    const form = useRef();
    /*const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm("service_wovwx47",
        "template_fjuaifc",
        form.current, 
        "9EFMMNwkoGjGFwC1p",
    ).then(
        result => console.log(result.text),
        error => console.log(error.text)
    );
    e.target.reset();
    };*/
    return (
        <form ref={form}>
            <label>Name</label>
            <input type="text" name="user name"/>
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <input type="text" name="message"/>
            <input type="submit" value="Send"/>
        </form>
    )

}
export default ContactScreen