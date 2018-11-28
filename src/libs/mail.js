"use strict";
const nodemailer = require('nodemailer'),
      logger = require('./logger');

module.exports = config => {
    
    
	let from = ' "Trver" <admin@trver.com>';
    let errorRecipient = "frank25184@sina.com";
    
	let smtpConfig = {
	    host: config.mail_opts.host,
	    port: config.mail_opts.port,
	    secure: config.mail_opts.secure, // use SSL
	    auth: {
	        user: config.mail_opts.auth.user,
	        pass: config.mail_opts.auth.pass
	    }
    };
    
    let defaultMessage = {
        // sender info
        from: from,
        headers: {
             'X-Made-In-Love-by': 'Frank Lee' 
        }// just an example header, no need to use this
    };

	let mailTransport = nodemailer.createTransport(smtpConfig, defaultMessage);


	function sendMail(to,subj,body){
		 return mailTransport.sendMail({
		    	to: to,
		    	subject: subj,
		    	html:body,
		    	// generateTextFromHtml: true
			}, function(err, info){
				if(err){
					return logger.error('Unable to send mail: ' + err);
				}else{
					logger.debug(`successfully send mail to ${to}, sent: ${info.messageId}`);
				}
			});
	}

	function sendGroupMail(mailList,subj,body){
		    let mailLimit = 100;

            for(let i = 0; i<mailList.length/mailLimit; i++){

            	   let toGroup = mailList.slice(i*mailLimit, (i+1)*mailLimit).join(',');
            	   logger.debug(toGroup);

				    return mailTransport.sendMail({
				    	to: toGroup,
				    	subject: subj,
				    	html:body,
				    	// generateTextFromHtml: true
		               
					}, function(err, info){
						if(err){
							logger.error('Unable to send mail: ' + err);
						}
					});            	
            }
	}


	return {
		send: sendMail,
		sendToGroup: sendGroupMail,
		mailError: (message,filename,exception)=>{
			let body = '<h1>Site Error</h1>' +
			           'message: <br><pre>' + message +'</pre><br>';
			if(exception) {body += 'exception:<br><pre>' + exception + '</pre><br>';}
			if(filename){body += 'exception:<br><pre>' + filename + '</pre><br>';}

			sendMail(errorRecipient,'Site Error', body);

		}
	};	

};