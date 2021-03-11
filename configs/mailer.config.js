const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASSWORD,
    },
})

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error)
    } else {
        console.log('Nodemailer is ready!')
    }
})

module.exports.sendActivationEmail = (email, token) => {
    transporter
        .sendMail({
            from: `"Coop" <thecoopspain@gmail.com>`,
            to: email,
            subject: 'Activa tu cuenta',
            text: 'Gracias por registrarte en Rodiles',
            html: `
								<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
				<head>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
				<!--[if !mso]><!-->
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<!--<![endif]-->
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta name="format-detection" content="telephone=no">
				<meta name="x-apple-disable-message-reformatting">
				<title></title>
				<style type="text/css">
					@media screen {
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 300;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 400;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VflQ.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vfkw.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 500;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 700;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 800;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uQg.woff') format('woff');
					}
					}
				</style>
				<style type="text/css">
					#outlook a {
					padding: 0;
					}

					.ReadMsgBody,
					.ExternalClass {
					width: 100%;
					}

					.ExternalClass,
					.ExternalClass p,
					.ExternalClass td,
					.ExternalClass div,
					.ExternalClass span,
					.ExternalClass font {
					line-height: 100%;
					}

					div[style*="margin: 14px 0"],
					div[style*="margin: 16px 0"] {
					margin: 0 !important;
					}

					table,
					td {
					mso-table-lspace: 0;
					mso-table-rspace: 0;
					}

					table,
					tr,
					td {
					border-collapse: collapse;
					}

					body,
					td,
					th,
					p,
					div,
					li,
					a,
					span {
					-webkit-text-size-adjust: 100%;
					-ms-text-size-adjust: 100%;
					mso-line-height-rule: exactly;
					}

					img {
					border: 0;
					outline: none;
					line-height: 100%;
					text-decoration: none;
					-ms-interpolation-mode: bicubic;
					}

					a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: none !important;
					}

					body {
					margin: 0;
					padding: 0;
					width: 100% !important;
					-webkit-font-smoothing: antialiased;
					}

					.pc-gmail-fix {
					display: none;
					display: none !important;
					}

					@media screen and (min-width: 621px) {
					.pc-email-container {
						width: 620px !important;
					}
					}
				</style>
				<style type="text/css">
					@media screen and (max-width:620px) {
					.pc-sm-p-20 {
						padding: 20px !important
					}
					.pc-sm-p-35-30 {
						padding: 35px 30px !important
					}
					.pc-sm-p-21-10-14 {
						padding: 21px 10px 14px !important
					}
					.pc-sm-h-20 {
						height: 20px !important
					}
					.pc-sm-mw-100pc {
						max-width: 100% !important
					}
					}
				</style>
				<style type="text/css">
					@media screen and (max-width:525px) {
					.pc-xs-p-10 {
						padding: 10px !important
					}
					.pc-xs-p-25-20 {
						padding: 25px 20px !important
					}
					.pc-xs-fs-30 {
						font-size: 30px !important
					}
					.pc-xs-lh-42 {
						line-height: 42px !important
					}
					.pc-xs-br-disabled br {
						display: none !important
					}
					.pc-xs-p-5-0 {
						padding: 5px 0 !important
					}
					}
				</style>
				<!--[if mso]>
					<style type="text/css">
						.pc-fb-font {
							font-family: Helvetica, Arial, sans-serif !important;
						}
					</style>
					<![endif]-->
				<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
				</head>
				<body style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4" class="">
				<div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">This is preheader text. Some clients will show this text as a preview.</div>
				<div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0;">
					‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
				</div>
				<table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed;">
					<tbody>
					<tr>
						<td class="pc-email-body-inner" align="center" valign="top">
						<!--[if gte mso 9]>
							<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
								<v:fill type="tile" src="" color="#f4f4f4"/>
							</v:background>
							<![endif]-->
						<!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
						<table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto; max-width: 620px;">
							<tbody>
							<tr>
								<td align="left" valign="top" style="padding: 0 10px;">
								<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tbody>
									<tr>
										<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
									</tr>
									</tbody>
								</table>
								<!-- BEGIN MODULE: Call to Action 2 -->
								<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
									<tbody>
									<tr>
										<td class="pc-sm-p-35-30 pc-xs-p-25-20" style="padding: 40px; background-color: #ffffff; border-radius: 8px;" valign="top" bgcolor="#ffffff">
										<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
											<tbody>
											<tr>
												<td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 900; line-height: 46px; letter-spacing: -0.6px; color: #151515; text-align: center;" valign="top">Activa tu cuenta</td>
											</tr>
											<tr>
												<td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 300; line-height: 28px; color: #1B1B1B; letter-spacing: -0.2px;" valign="top" align="center">Gracias por registrarte en Nodemailer test. Haz click en el siguiente enlace para activar tu cuenta.</td>
											</tr>
											<tr>
												<td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td style="padding: 5px 0;" valign="top" align="center">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation">
													<tbody>
													<tr>
														<td style="padding: 13px 17px; border-radius: 8px; background-color: #1595E7;" bgcolor="#1595E7" valign="top" align="center">
														<a href="${
                                                            process.env.HOST ||
                                                            `http://localhost:${
                                                                process.env
                                                                    .PORT ||
                                                                3000
                                                            }`
                                                        }/activate/${token}" style="line-height: 1.5; text-decoration: none; word-break: break-word; font-weight: 500; display: block; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff;">Activar cuenta</a>
														</td>
													</tr>
													</tbody>
												</table>
												</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											<tr>
												<td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; color: #9B9B9B; text-align: center;" valign="top">Expira en 15 minutos</td>
											</tr>
											</tbody>
										</table>
										</td>
									</tr>
									</tbody>
								</table>
								<!-- END MODULE: Call to Action 2 -->
								<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tbody>
									<tr>
										<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
									</tr>
									</tbody>
								</table>
								</td>
							</tr>
							</tbody>
						</table>
						<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
						</td>
					</tr>
					</tbody>
				</table>
				<!-- Fix for Gmail on iOS -->
				<div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
				</body>
				</html>
			`,
        })
        .then((mail) => console.log('Email de activación enviado!'))
        .catch((e) => console.log(e))
}

module.exports.sendUpdateEmail = (email, token) => {
    transporter
        .sendMail({
            from: `"Coop" <thecoopspain@gmail.com>`,
            to: email,
            subject: 'Verifica el email',
            text: 'Veifica este email para editarlo en el perfil de Coop',
            html: `
								<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
				<head>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
				<!--[if !mso]><!-->
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<!--<![endif]-->
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta name="format-detection" content="telephone=no">
				<meta name="x-apple-disable-message-reformatting">
				<title></title>
				<style type="text/css">
					@media screen {
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 300;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 400;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VflQ.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vfkw.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 500;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 700;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 800;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uQg.woff') format('woff');
					}
					}
				</style>
				<style type="text/css">
					#outlook a {
					padding: 0;
					}

					.ReadMsgBody,
					.ExternalClass {
					width: 100%;
					}

					.ExternalClass,
					.ExternalClass p,
					.ExternalClass td,
					.ExternalClass div,
					.ExternalClass span,
					.ExternalClass font {
					line-height: 100%;
					}

					div[style*="margin: 14px 0"],
					div[style*="margin: 16px 0"] {
					margin: 0 !important;
					}

					table,
					td {
					mso-table-lspace: 0;
					mso-table-rspace: 0;
					}

					table,
					tr,
					td {
					border-collapse: collapse;
					}

					body,
					td,
					th,
					p,
					div,
					li,
					a,
					span {
					-webkit-text-size-adjust: 100%;
					-ms-text-size-adjust: 100%;
					mso-line-height-rule: exactly;
					}

					img {
					border: 0;
					outline: none;
					line-height: 100%;
					text-decoration: none;
					-ms-interpolation-mode: bicubic;
					}

					a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: none !important;
					}

					body {
					margin: 0;
					padding: 0;
					width: 100% !important;
					-webkit-font-smoothing: antialiased;
					}

					.pc-gmail-fix {
					display: none;
					display: none !important;
					}

					@media screen and (min-width: 621px) {
					.pc-email-container {
						width: 620px !important;
					}
					}
				</style>
				<style type="text/css">
					@media screen and (max-width:620px) {
					.pc-sm-p-20 {
						padding: 20px !important
					}
					.pc-sm-p-35-30 {
						padding: 35px 30px !important
					}
					.pc-sm-p-21-10-14 {
						padding: 21px 10px 14px !important
					}
					.pc-sm-h-20 {
						height: 20px !important
					}
					.pc-sm-mw-100pc {
						max-width: 100% !important
					}
					}
				</style>
				<style type="text/css">
					@media screen and (max-width:525px) {
					.pc-xs-p-10 {
						padding: 10px !important
					}
					.pc-xs-p-25-20 {
						padding: 25px 20px !important
					}
					.pc-xs-fs-30 {
						font-size: 30px !important
					}
					.pc-xs-lh-42 {
						line-height: 42px !important
					}
					.pc-xs-br-disabled br {
						display: none !important
					}
					.pc-xs-p-5-0 {
						padding: 5px 0 !important
					}
					}
				</style>
				<!--[if mso]>
					<style type="text/css">
						.pc-fb-font {
							font-family: Helvetica, Arial, sans-serif !important;
						}
					</style>
					<![endif]-->
				<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
				</head>
				<body style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4" class="">
				<div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">This is preheader text. Some clients will show this text as a preview.</div>
				<div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0;">
					‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
				</div>
				<table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed;">
					<tbody>
					<tr>
						<td class="pc-email-body-inner" align="center" valign="top">
						<!--[if gte mso 9]>
							<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
								<v:fill type="tile" src="" color="#f4f4f4"/>
							</v:background>
							<![endif]-->
						<!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
						<table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto; max-width: 620px;">
							<tbody>
							<tr>
								<td align="left" valign="top" style="padding: 0 10px;">
								<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tbody>
									<tr>
										<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
									</tr>
									</tbody>
								</table>
								<!-- BEGIN MODULE: Call to Action 2 -->
								<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
									<tbody>
									<tr>
										<td class="pc-sm-p-35-30 pc-xs-p-25-20" style="padding: 40px; background-color: #ffffff; border-radius: 8px;" valign="top" bgcolor="#ffffff">
										<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
											<tbody>
											<tr>
												<td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 900; line-height: 46px; letter-spacing: -0.6px; color: #151515; text-align: center;" valign="top">Activa tu cuenta</td>
											</tr>
											<tr>
												<td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 300; line-height: 28px; color: #1B1B1B; letter-spacing: -0.2px;" valign="top" align="center">Gracias por registrarte en Nodemailer test. Haz click en el siguiente enlace para activar tu cuenta.</td>
											</tr>
											<tr>
												<td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td style="padding: 5px 0;" valign="top" align="center">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation">
													<tbody>
													<tr>
														<td style="padding: 13px 17px; border-radius: 8px; background-color: #1595E7;" bgcolor="#1595E7" valign="top" align="center">
														<a href="${
                                                            process.env.HOST ||
                                                            `http://localhost:${
                                                                process.env
                                                                    .PORT ||
                                                                3000
                                                            }`
                                                        }/activate-email/${token}" style="line-height: 1.5; text-decoration: none; word-break: break-word; font-weight: 500; display: block; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff;">Activar cuenta</a>
														</td>
													</tr>
													</tbody>
												</table>
												</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											<tr>
												<td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; color: #9B9B9B; text-align: center;" valign="top">Expira en 15 minutos</td>
											</tr>
											</tbody>
										</table>
										</td>
									</tr>
									</tbody>
								</table>
								<!-- END MODULE: Call to Action 2 -->
								<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tbody>
									<tr>
										<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
									</tr>
									</tbody>
								</table>
								</td>
							</tr>
							</tbody>
						</table>
						<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
						</td>
					</tr>
					</tbody>
				</table>
				<!-- Fix for Gmail on iOS -->
				<div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
				</body>
				</html>
			`,
        })
        .then((mail) => console.log('Email de cambio de email enviado!'))
        .catch((e) => console.log(e))
}

module.exports.sendChangePassEmail = (email, token) => {
    transporter
        .sendMail({
            from: `"Coop" <thecoopspain@gmail.com>`,
            to: email,
            subject: 'Verifica el email y cambia tú contraseña',
            text:
                'Veifica este email para cambiar tu contraseña de la cuenta de Coop',
            html: `
								<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
				<head>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
				<!--[if !mso]><!-->
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<!--<![endif]-->
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta name="format-detection" content="telephone=no">
				<meta name="x-apple-disable-message-reformatting">
				<title></title>
				<style type="text/css">
					@media screen {
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 300;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 400;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VflQ.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vfkw.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 500;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 700;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 800;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uQg.woff') format('woff');
					}
					}
				</style>
				<style type="text/css">
					#outlook a {
					padding: 0;
					}

					.ReadMsgBody,
					.ExternalClass {
					width: 100%;
					}

					.ExternalClass,
					.ExternalClass p,
					.ExternalClass td,
					.ExternalClass div,
					.ExternalClass span,
					.ExternalClass font {
					line-height: 100%;
					}

					div[style*="margin: 14px 0"],
					div[style*="margin: 16px 0"] {
					margin: 0 !important;
					}

					table,
					td {
					mso-table-lspace: 0;
					mso-table-rspace: 0;
					}

					table,
					tr,
					td {
					border-collapse: collapse;
					}

					body,
					td,
					th,
					p,
					div,
					li,
					a,
					span {
					-webkit-text-size-adjust: 100%;
					-ms-text-size-adjust: 100%;
					mso-line-height-rule: exactly;
					}

					img {
					border: 0;
					outline: none;
					line-height: 100%;
					text-decoration: none;
					-ms-interpolation-mode: bicubic;
					}

					a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: none !important;
					}

					body {
					margin: 0;
					padding: 0;
					width: 100% !important;
					-webkit-font-smoothing: antialiased;
					}

					.pc-gmail-fix {
					display: none;
					display: none !important;
					}

					@media screen and (min-width: 621px) {
					.pc-email-container {
						width: 620px !important;
					}
					}
				</style>
				<style type="text/css">
					@media screen and (max-width:620px) {
					.pc-sm-p-20 {
						padding: 20px !important
					}
					.pc-sm-p-35-30 {
						padding: 35px 30px !important
					}
					.pc-sm-p-21-10-14 {
						padding: 21px 10px 14px !important
					}
					.pc-sm-h-20 {
						height: 20px !important
					}
					.pc-sm-mw-100pc {
						max-width: 100% !important
					}
					}
				</style>
				<style type="text/css">
					@media screen and (max-width:525px) {
					.pc-xs-p-10 {
						padding: 10px !important
					}
					.pc-xs-p-25-20 {
						padding: 25px 20px !important
					}
					.pc-xs-fs-30 {
						font-size: 30px !important
					}
					.pc-xs-lh-42 {
						line-height: 42px !important
					}
					.pc-xs-br-disabled br {
						display: none !important
					}
					.pc-xs-p-5-0 {
						padding: 5px 0 !important
					}
					}
				</style>
				<!--[if mso]>
					<style type="text/css">
						.pc-fb-font {
							font-family: Helvetica, Arial, sans-serif !important;
						}
					</style>
					<![endif]-->
				<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
				</head>
				<body style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4" class="">
				<div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">This is preheader text. Some clients will show this text as a preview.</div>
				<div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0;">
					‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
				</div>
				<table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed;">
					<tbody>
					<tr>
						<td class="pc-email-body-inner" align="center" valign="top">
						<!--[if gte mso 9]>
							<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
								<v:fill type="tile" src="" color="#f4f4f4"/>
							</v:background>
							<![endif]-->
						<!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
						<table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto; max-width: 620px;">
							<tbody>
							<tr>
								<td align="left" valign="top" style="padding: 0 10px;">
								<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tbody>
									<tr>
										<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
									</tr>
									</tbody>
								</table>
								<!-- BEGIN MODULE: Call to Action 2 -->
								<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
									<tbody>
									<tr>
										<td class="pc-sm-p-35-30 pc-xs-p-25-20" style="padding: 40px; background-color: #ffffff; border-radius: 8px;" valign="top" bgcolor="#ffffff">
										<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
											<tbody>
											<tr>
												<td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 900; line-height: 46px; letter-spacing: -0.6px; color: #151515; text-align: center;" valign="top">Activa tu cuenta</td>
											</tr>
											<tr>
												<td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 300; line-height: 28px; color: #1B1B1B; letter-spacing: -0.2px;" valign="top" align="center">Gracias por registrarte en Nodemailer test. Haz click en el siguiente enlace para activar tu cuenta.</td>
											</tr>
											<tr>
												<td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td style="padding: 5px 0;" valign="top" align="center">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation">
													<tbody>
													<tr>
														<td style="padding: 13px 17px; border-radius: 8px; background-color: #1595E7;" bgcolor="#1595E7" valign="top" align="center">
														<a href="${
                                                            process.env.HOST ||
                                                            `http://localhost:${
                                                                process.env
                                                                    .PORT ||
                                                                3000
                                                            }`
                                                        }/change-inaction/${token}" style="line-height: 1.5; text-decoration: none; word-break: break-word; font-weight: 500; display: block; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff;">Activar cuenta</a>
														</td>
													</tr>
													</tbody>
												</table>
												</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											<tr>
												<td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; color: #9B9B9B; text-align: center;" valign="top">Expira en 15 minutos</td>
											</tr>
											</tbody>
										</table>
										</td>
									</tr>
									</tbody>
								</table>
								<!-- END MODULE: Call to Action 2 -->
								<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tbody>
									<tr>
										<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
									</tr>
									</tbody>
								</table>
								</td>
							</tr>
							</tbody>
						</table>
						<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
						</td>
					</tr>
					</tbody>
				</table>
				<!-- Fix for Gmail on iOS -->
				<div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
				</body>
				</html>
			`,
        })
        .then((mail) => console.log('Email de cambio de email enviado!'))
        .catch((e) => console.log(e))
}

module.exports.sendChangePassEmailSocial = (email, token) => {
    transporter
        .sendMail({
            from: `"Coop" <thecoopspain@gmail.com>`,
            to: email,
            subject: 'Verifica el email y cambia tú contraseña - SOCIAL',
            text:
                'Veifica este email para cambiar tu contraseña de la cuenta de Coop',
            html: `
								<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
				<head>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
				<!--[if !mso]><!-->
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<!--<![endif]-->
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta name="format-detection" content="telephone=no">
				<meta name="x-apple-disable-message-reformatting">
				<title></title>
				<style type="text/css">
					@media screen {
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 300;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 400;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VflQ.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vfkw.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 500;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 700;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 800;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uQg.woff') format('woff');
					}
					}
				</style>
				<style type="text/css">
					#outlook a {
					padding: 0;
					}

					.ReadMsgBody,
					.ExternalClass {
					width: 100%;
					}

					.ExternalClass,
					.ExternalClass p,
					.ExternalClass td,
					.ExternalClass div,
					.ExternalClass span,
					.ExternalClass font {
					line-height: 100%;
					}

					div[style*="margin: 14px 0"],
					div[style*="margin: 16px 0"] {
					margin: 0 !important;
					}

					table,
					td {
					mso-table-lspace: 0;
					mso-table-rspace: 0;
					}

					table,
					tr,
					td {
					border-collapse: collapse;
					}

					body,
					td,
					th,
					p,
					div,
					li,
					a,
					span {
					-webkit-text-size-adjust: 100%;
					-ms-text-size-adjust: 100%;
					mso-line-height-rule: exactly;
					}

					img {
					border: 0;
					outline: none;
					line-height: 100%;
					text-decoration: none;
					-ms-interpolation-mode: bicubic;
					}

					a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: none !important;
					}

					body {
					margin: 0;
					padding: 0;
					width: 100% !important;
					-webkit-font-smoothing: antialiased;
					}

					.pc-gmail-fix {
					display: none;
					display: none !important;
					}

					@media screen and (min-width: 621px) {
					.pc-email-container {
						width: 620px !important;
					}
					}
				</style>
				<style type="text/css">
					@media screen and (max-width:620px) {
					.pc-sm-p-20 {
						padding: 20px !important
					}
					.pc-sm-p-35-30 {
						padding: 35px 30px !important
					}
					.pc-sm-p-21-10-14 {
						padding: 21px 10px 14px !important
					}
					.pc-sm-h-20 {
						height: 20px !important
					}
					.pc-sm-mw-100pc {
						max-width: 100% !important
					}
					}
				</style>
				<style type="text/css">
					@media screen and (max-width:525px) {
					.pc-xs-p-10 {
						padding: 10px !important
					}
					.pc-xs-p-25-20 {
						padding: 25px 20px !important
					}
					.pc-xs-fs-30 {
						font-size: 30px !important
					}
					.pc-xs-lh-42 {
						line-height: 42px !important
					}
					.pc-xs-br-disabled br {
						display: none !important
					}
					.pc-xs-p-5-0 {
						padding: 5px 0 !important
					}
					}
				</style>
				<!--[if mso]>
					<style type="text/css">
						.pc-fb-font {
							font-family: Helvetica, Arial, sans-serif !important;
						}
					</style>
					<![endif]-->
				<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
				</head>
				<body style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4" class="">
				<div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">This is preheader text. Some clients will show this text as a preview.</div>
				<div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0;">
					‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
				</div>
				<table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed;">
					<tbody>
					<tr>
						<td class="pc-email-body-inner" align="center" valign="top">
						<!--[if gte mso 9]>
							<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
								<v:fill type="tile" src="" color="#f4f4f4"/>
							</v:background>
							<![endif]-->
						<!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
						<table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto; max-width: 620px;">
							<tbody>
							<tr>
								<td align="left" valign="top" style="padding: 0 10px;">
								<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tbody>
									<tr>
										<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
									</tr>
									</tbody>
								</table>
								<!-- BEGIN MODULE: Call to Action 2 -->
								<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
									<tbody>
									<tr>
										<td class="pc-sm-p-35-30 pc-xs-p-25-20" style="padding: 40px; background-color: #ffffff; border-radius: 8px;" valign="top" bgcolor="#ffffff">
										<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
											<tbody>
											<tr>
												<td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 900; line-height: 46px; letter-spacing: -0.6px; color: #151515; text-align: center;" valign="top">Activa tu cuenta</td>
											</tr>
											<tr>
												<td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 300; line-height: 28px; color: #1B1B1B; letter-spacing: -0.2px;" valign="top" align="center">Gracias por registrarte en Nodemailer test. Haz click en el siguiente enlace para activar tu cuenta.</td>
											</tr>
											<tr>
												<td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td style="padding: 5px 0;" valign="top" align="center">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation">
													<tbody>
													<tr>
														<td style="padding: 13px 17px; border-radius: 8px; background-color: #1595E7;" bgcolor="#1595E7" valign="top" align="center">
														<a href="${
                                                            process.env.HOST ||
                                                            `http://localhost:${
                                                                process.env
                                                                    .PORT ||
                                                                3000
                                                            }`
                                                        }/change-inaction-social/${token}" style="line-height: 1.5; text-decoration: none; word-break: break-word; font-weight: 500; display: block; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff;">Activar cuenta</a>
														</td>
													</tr>
													</tbody>
												</table>
												</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											<tr>
												<td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; color: #9B9B9B; text-align: center;" valign="top">Expira en 15 minutos</td>
											</tr>
											</tbody>
										</table>
										</td>
									</tr>
									</tbody>
								</table>
								<!-- END MODULE: Call to Action 2 -->
								<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tbody>
									<tr>
										<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
									</tr>
									</tbody>
								</table>
								</td>
							</tr>
							</tbody>
						</table>
						<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
						</td>
					</tr>
					</tbody>
				</table>
				<!-- Fix for Gmail on iOS -->
				<div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
				</body>
				</html>
			`,
        })
        .then((mail) => console.log('Email de cambio de email enviado!'))
        .catch((e) => console.log(e))
}

module.exports.sendForgotPasswordEmail = (email, token) => {
    transporter
        .sendMail({
            from: `"Coop" <thecoopspain@gmail.com>`,
            to: email,
            subject: 'Restaura tu contraseña',
            text: 'Restaura tu contraseña en Coop',
            html: `
				<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
				<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
				<head>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
				<!--[if !mso]><!-->
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<!--<![endif]-->
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta name="format-detection" content="telephone=no">
				<meta name="x-apple-disable-message-reformatting">
				<title></title>
				<style type="text/css">
					@media screen {
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 300;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 400;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VflQ.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vfkw.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 500;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 700;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uQg.woff') format('woff');
					}
					@font-face {
						font-family: 'Fira Sans';
						font-style: normal;
						font-weight: 800;
						src: local(''),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uRA.woff2') format('woff2'),
						url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uQg.woff') format('woff');
					}
					}
				</style>
				<style type="text/css">
					#outlook a {
					padding: 0;
					}

					.ReadMsgBody,
					.ExternalClass {
					width: 100%;
					}

					.ExternalClass,
					.ExternalClass p,
					.ExternalClass td,
					.ExternalClass div,
					.ExternalClass span,
					.ExternalClass font {
					line-height: 100%;
					}

					div[style*="margin: 14px 0"],
					div[style*="margin: 16px 0"] {
					margin: 0 !important;
					}

					table,
					td {
					mso-table-lspace: 0;
					mso-table-rspace: 0;
					}

					table,
					tr,
					td {
					border-collapse: collapse;
					}

					body,
					td,
					th,
					p,
					div,
					li,
					a,
					span {
					-webkit-text-size-adjust: 100%;
					-ms-text-size-adjust: 100%;
					mso-line-height-rule: exactly;
					}

					img {
					border: 0;
					outline: none;
					line-height: 100%;
					text-decoration: none;
					-ms-interpolation-mode: bicubic;
					}

					a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: none !important;
					}

					body {
					margin: 0;
					padding: 0;
					width: 100% !important;
					-webkit-font-smoothing: antialiased;
					}

					.pc-gmail-fix {
					display: none;
					display: none !important;
					}

					@media screen and (min-width: 621px) {
					.pc-email-container {
						width: 620px !important;
					}
					}
				</style>
				<style type="text/css">
					@media screen and (max-width:620px) {
					.pc-sm-p-20 {
						padding: 20px !important
					}
					.pc-sm-p-35-30 {
						padding: 35px 30px !important
					}
					.pc-sm-p-21-10-14 {
						padding: 21px 10px 14px !important
					}
					.pc-sm-h-20 {
						height: 20px !important
					}
					.pc-sm-mw-100pc {
						max-width: 100% !important
					}
					}
				</style>
				<style type="text/css">
					@media screen and (max-width:525px) {
					.pc-xs-p-10 {
						padding: 10px !important
					}
					.pc-xs-p-25-20 {
						padding: 25px 20px !important
					}
					.pc-xs-fs-30 {
						font-size: 30px !important
					}
					.pc-xs-lh-42 {
						line-height: 42px !important
					}
					.pc-xs-br-disabled br {
						display: none !important
					}
					.pc-xs-p-5-0 {
						padding: 5px 0 !important
					}
					}
				</style>
				<!--[if mso]>
					<style type="text/css">
						.pc-fb-font {
							font-family: Helvetica, Arial, sans-serif !important;
						}
					</style>
					<![endif]-->
				<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
				</head>
				<body style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4" class="">
				<div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">This is preheader text. Some clients will show this text as a preview.</div>
				<div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0;">
					‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
				</div>
				<table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed;">
					<tbody>
					<tr>
						<td class="pc-email-body-inner" align="center" valign="top">
						<!--[if gte mso 9]>
							<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
								<v:fill type="tile" src="" color="#f4f4f4"/>
							</v:background>
							<![endif]-->
						<!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
						<table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto; max-width: 620px;">
							<tbody>
							<tr>
								<td align="left" valign="top" style="padding: 0 10px;">
								<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tbody>
									<tr>
										<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
									</tr>
									</tbody>
								</table>
								<!-- BEGIN MODULE: Call to Action 2 -->
								<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
									<tbody>
									<tr>
										<td class="pc-sm-p-35-30 pc-xs-p-25-20" style="padding: 40px; background-color: #ffffff; border-radius: 8px;" valign="top" bgcolor="#ffffff">
										<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
											<tbody>
											<tr>
												<td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 900; line-height: 46px; letter-spacing: -0.6px; color: #151515; text-align: center;" valign="top">Activa tu cuenta</td>
											</tr>
											<tr>
												<td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 300; line-height: 28px; color: #1B1B1B; letter-spacing: -0.2px;" valign="top" align="center">
												Para actualizar tu contraseña haz click en el siguiente enlace. Si no has solicitado un cambio de contraseña no hace falta que hagas nada.</td>
											</tr>
											<tr>
												<td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td style="padding: 5px 0;" valign="top" align="center">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation">
													<tbody>
													<tr>
														<td style="padding: 13px 17px; border-radius: 8px; background-color: #1595E7;" bgcolor="#1595E7" valign="top" align="center">
														<a href="${
                                                            process.env.HOST ||
                                                            `http://localhost:${
                                                                process.env
                                                                    .PORT ||
                                                                3000
                                                            }`
                                                        }/reset-password/${token}" style="line-height: 1.5; text-decoration: none; word-break: break-word; font-weight: 500; display: block; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff;">Activar cuenta</a>
														</td>
													</tr>
													</tbody>
												</table>
												</td>
											</tr>
											</tbody>
											<tbody>
											<tr>
												<td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
											</tr>
											<tr>
												<td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; color: #9B9B9B; text-align: center;" valign="top">Expira en 15 minutos</td>
											</tr>
											</tbody>
										</table>
										</td>
									</tr>
									</tbody>
								</table>
								<!-- END MODULE: Call to Action 2 -->
								<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
									<tbody>
									<tr>
										<td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
									</tr>
									</tbody>
								</table>
								</td>
							</tr>
							</tbody>
						</table>
						<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
						</td>
					</tr>
					</tbody>
				</table>
				<!-- Fix for Gmail on iOS -->
				<div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
				</body>
				</html>
			`,
        })
        .then((mail) => console.log('Email de activación enviado!'))
        .catch((e) => console.log(e))
}

module.exports.sendRequestDelete = (reciever, sender, reason) => {
	transporter
	.sendMail({
		from: `"Coop" <thecoopspain@gmail.com>`,
		to: reciever,
		subject: 'Request to delete org account',
		text: 'Quieren borrar una cuenta',
		html: `La organización ${sender} require borrar su cuenta por ${reason}`
		})
		.then((mail) => console.log('Email de solicitud de eliminar cuenta enviado!'))
		.catch((e) => console.log(e))
}

module.exports.deleteProyectRequest = (reciever, sender, project, reason) => {
	transporter
	.sendMail({
		from: `"Coop" <thecoopspain@gmail.com>`,
		to: reciever,
		subject: 'Request to delete project',
		text: 'Quieren borrar un proyecto',
		html: `La organización ${sender} require borrar el pryecto ${project} por ${reason}`
		})
		.then((mail) => console.log('Email de solicitud de eliminar cuenta enviado!'))
		.catch((e) => console.log(e))
}

module.exports.sendInfoEmail = (email, info) => {
	transporter
	.sendMail({
		from: `"Coop" <thecoopspain@gmail.com>`,
		to: email,
		subject: 'Información solicitada',
		text: 'Has solicitado la siguiente información',
		html: `${info}`
		})
		.then((mail) => console.log('Email de solicitud de eliminar cuenta enviado!'))
		.catch((e) => console.log(e))
}