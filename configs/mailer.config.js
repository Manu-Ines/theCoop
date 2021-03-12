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
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
      .pc-sm-p-30 {
        padding: 30px !important
      }
      .pc-sm-p-18-30 {
        padding: 18px 30px !important
      }
      .pc-sm-p-30-20-25 {
        padding: 30px 20px 25px !important
      }
      .pc-sm-fs-30 {
        font-size: 30px !important
      }
      .pc-sm-fs-18 {
        font-size: 18px !important
      }
      .pc-sm-p-38-30-40 {
        padding: 38px 30px 40px !important
      }
    }
  </style>
  <style type="text/css">
    @media screen and (max-width:525px) {
      .pc-xs-p-25-20 {
        padding: 25px 20px !important
      }
      .pc-xs-p-18-20 {
        padding: 18px 20px !important
      }
      .pc-xs-p-0 {
        padding: 0 !important
      }
      .pc-xs-p-25-10-20 {
        padding: 25px 10px 20px !important
      }
      .pc-xs-fs-16 {
        font-size: 16px !important
      }
      .pc-xs-br-disabled br {
        display: none !important
      }
      .pc-xs-fs-14 {
        font-size: 14px !important
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
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">Gracias por registrarte en Rodiles</div>
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px;">
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
                  <!-- BEGIN MODULE: Menu 4 -->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td valign="top" bgcolor="#1167b1" style="background-color: #1167b1; border-radius: 8px">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-30 pc-xs-p-25-20" valign="top" align="center" style="padding: 30px 40px;">
                                  <a href="https://thecoopspain.herokuapp.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/white-logo-FVa_buxjn8.png" width="130" height="" alt="" style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="1" bgcolor="#4B4B4B" style="background-color: rgba(255, 255, 255, 0.15); font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-18-30 pc-xs-p-18-20 pc-fb-font pc-sm-p-18-30 pc-xs-p-18-20" valign="top" style="padding: 18px 40px; text-align: center; font-family: Helvetica, sans-serif; line-height: 20px; font-size: 14px" pc-default-class="pc-sm-p-18-30 pc-xs-p-18-20" pc-default-padding="18px 40px">
                                  <a href="https://thecoopspain.herokuapp.com" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Inicio</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/proyectos" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Proyectos</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/voluntariados" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Voluntariados</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/organizaciones" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Organizaciones</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Menu 4 -->
                  <!-- BEGIN MODULE: Transactional 2 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-30-20-25 pc-xs-p-25-10-20" style="padding: 40px 30px 35px; background: #ffffff; border-radius: 8px;" bgcolor="#ffffff" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-30 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 46px; letter-spacing: -0.6px; color: #151515; padding: 0 10px;" valign="top">Activa tu cuenta en Coop</td>
                              </tr>
                              <tr>
                                <td height="15" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-18 pc-xs-fs-16 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 10px;" valign="top">
                                  <div style="text-align: left;">Bienvenido a la comunidad de Coop. A partir de ahora tendrás la oportunidad de apoyar a proyectos que te interesan o de ayudar a los voluntariados de tu zona. Para activar tu cuenta en Coop, haz click en el siguiente botón.</div>
                                </td>
                              </tr>
                              <tr>
                                <td height="25" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td style="padding: 5px 10px;" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td style="border-radius: 8px; padding: 14px 19px; background-color: #1167b1" bgcolor="#1167b1" valign="top" align="center">
                                          <a class="pc-fb-font" href="${
                                              process.env.HOST ||
                                              `http://localhost:${
                                                  process.env.PORT || 3000
                                              }`
                                          }/activate/${token}" style="text-decoration: none; word-break: break-word; line-height: 24px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; color: #ffffff; display: block;">Activar mi cuenta</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Transactional 2 -->
                  <!-- BEGIN MODULE: Footer 6 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-38-30-40 pc-xs-p-25-20" style="padding: 38px 40px 40px 40px; background-color: #1167b1; border-radius: 8px" valign="top" bgcolor="#1167b1">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-xs-fs-14" style="text-align: center; font-family: Arial, sans-serif; font-size: 24px;" valign="top">
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/facebook-large-white_yccszw.png" width="20" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/twitter-large-white_xfb6y7.png" width="21" height="18" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/instagram-large-white_isoxsn.png" width="21" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-fb-font" style="text-align: center; line-height: 20px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; color: #ffffff" valign="top">The Coop Spain<br>thecoopspain.herokuapp.com</td>
                              </tr>
                              <tr>
                                <td height="13" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Footer 6 -->
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
</html>`,
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
            text: 'Verifica este email para editarlo en el perfil de Coop',
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
      .pc-sm-p-30 {
        padding: 30px !important
      }
      .pc-sm-p-18-30 {
        padding: 18px 30px !important
      }
      .pc-sm-p-30-20-25 {
        padding: 30px 20px 25px !important
      }
      .pc-sm-fs-30 {
        font-size: 30px !important
      }
      .pc-sm-fs-18 {
        font-size: 18px !important
      }
      .pc-sm-p-38-30-40 {
        padding: 38px 30px 40px !important
      }
    }
  </style>
  <style type="text/css">
    @media screen and (max-width:525px) {
      .pc-xs-p-25-20 {
        padding: 25px 20px !important
      }
      .pc-xs-p-18-20 {
        padding: 18px 20px !important
      }
      .pc-xs-p-0 {
        padding: 0 !important
      }
      .pc-xs-p-25-10-20 {
        padding: 25px 10px 20px !important
      }
      .pc-xs-fs-16 {
        font-size: 16px !important
      }
      .pc-xs-br-disabled br {
        display: none !important
      }
      .pc-xs-fs-14 {
        font-size: 14px !important
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
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">Verifica este email para editarlo en el perfil de Coop</div>
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px;">
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
                  <!-- BEGIN MODULE: Menu 4 -->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td valign="top" bgcolor="#1167b1" style="background-color: #1167b1; border-radius: 8px">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-30 pc-xs-p-25-20" valign="top" align="center" style="padding: 30px 40px;">
                                  <a href="https://thecoopspain.herokuapp.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/white-logo-FVa_buxjn8.png" width="130" height="" alt="" style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="1" bgcolor="#4B4B4B" style="background-color: rgba(255, 255, 255, 0.15); font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-18-30 pc-xs-p-18-20 pc-fb-font pc-sm-p-18-30 pc-xs-p-18-20" valign="top" style="padding: 18px 40px; text-align: center; font-family: Helvetica, sans-serif; line-height: 20px; font-size: 14px" pc-default-class="pc-sm-p-18-30 pc-xs-p-18-20" pc-default-padding="18px 40px">
                                  <a href="https://thecoopspain.herokuapp.com" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Inicio</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/proyectos" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Proyectos</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/voluntariados" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Voluntariados</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/organizaciones" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Organizaciones</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Menu 4 -->
                  <!-- BEGIN MODULE: Transactional 2 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-30-20-25 pc-xs-p-25-10-20" style="padding: 40px 30px 35px; background: #ffffff; border-radius: 8px;" bgcolor="#ffffff" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-30 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 46px; letter-spacing: -0.6px; color: #151515; padding: 0 10px;" valign="top">Verifica tu email</td>
                              </tr>
                              <tr>
                                <td height="15" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-18 pc-xs-fs-16 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 10px;" valign="top">
                                  <div style="text-align: left;">Para modificar tu email debemos verificar que te pertenece. Haz click en el siguiente enlace para verificar y modificar tu email.</div>
                                </td>
                              </tr>
                              <tr>
                                <td height="25" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td style="padding: 5px 10px;" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td style="border-radius: 8px; padding: 14px 19px; background-color: #1167b1" bgcolor="#1167b1" valign="top" align="center">
                                          <a class="pc-fb-font" href="${
                                              process.env.HOST ||
                                              `http://localhost:${
                                                  process.env.PORT || 3000
                                              }`
                                          }/activate-email/${token}" style="text-decoration: none; word-break: break-word; line-height: 24px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; color: #ffffff; display: block;">Activar email</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Transactional 2 -->
                  <!-- BEGIN MODULE: Footer 6 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-38-30-40 pc-xs-p-25-20" style="padding: 38px 40px 40px 40px; background-color: #1167b1; border-radius: 8px" valign="top" bgcolor="#1167b1">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-xs-fs-14" style="text-align: center; font-family: Arial, sans-serif; font-size: 24px;" valign="top">
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/facebook-large-white_yccszw.png" width="20" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/twitter-large-white_xfb6y7.png" width="21" height="18" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/instagram-large-white_isoxsn.png" width="21" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-fb-font" style="text-align: center; line-height: 20px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; color: #ffffff" valign="top">The Coop Spain<br>thecoopspain.herokuapp.com</td>
                              </tr>
                              <tr>
                                <td height="13" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Footer 6 -->
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
                'Verifica este email para cambiar tu contraseña de la cuenta de Coop',
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
      .pc-sm-p-30 {
        padding: 30px !important
      }
      .pc-sm-p-18-30 {
        padding: 18px 30px !important
      }
      .pc-sm-p-30-20-25 {
        padding: 30px 20px 25px !important
      }
      .pc-sm-fs-30 {
        font-size: 30px !important
      }
      .pc-sm-fs-18 {
        font-size: 18px !important
      }
      .pc-sm-p-38-30-40 {
        padding: 38px 30px 40px !important
      }
    }
  </style>
  <style type="text/css">
    @media screen and (max-width:525px) {
      .pc-xs-p-25-20 {
        padding: 25px 20px !important
      }
      .pc-xs-p-18-20 {
        padding: 18px 20px !important
      }
      .pc-xs-p-0 {
        padding: 0 !important
      }
      .pc-xs-p-25-10-20 {
        padding: 25px 10px 20px !important
      }
      .pc-xs-fs-16 {
        font-size: 16px !important
      }
      .pc-xs-br-disabled br {
        display: none !important
      }
      .pc-xs-fs-14 {
        font-size: 14px !important
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
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">Verifica este email para cambiar tu contraseña de la cuenta de Coop</div>
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px;">
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
                  <!-- BEGIN MODULE: Menu 4 -->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td valign="top" bgcolor="#1167b1" style="background-color: #1167b1; border-radius: 8px">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-30 pc-xs-p-25-20" valign="top" align="center" style="padding: 30px 40px;">
                                  <a href="https://thecoopspain.herokuapp.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/white-logo-FVa_buxjn8.png" width="130" height="" alt="" style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="1" bgcolor="#4B4B4B" style="background-color: rgba(255, 255, 255, 0.15); font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-18-30 pc-xs-p-18-20 pc-fb-font pc-sm-p-18-30 pc-xs-p-18-20" valign="top" style="padding: 18px 40px; text-align: center; font-family: Helvetica, sans-serif; line-height: 20px; font-size: 14px" pc-default-class="pc-sm-p-18-30 pc-xs-p-18-20" pc-default-padding="18px 40px">
                                  <a href="https://thecoopspain.herokuapp.com" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Inicio</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/proyectos" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Proyectos</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/voluntariados" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Voluntariados</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/organizaciones" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Organizaciones</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Menu 4 -->
                  <!-- BEGIN MODULE: Transactional 2 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-30-20-25 pc-xs-p-25-10-20" style="padding: 40px 30px 35px; background: #ffffff; border-radius: 8px;" bgcolor="#ffffff" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-30 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 46px; letter-spacing: -0.6px; color: #151515; padding: 0 10px;" valign="top">Modificar contraseña</td>
                              </tr>
                              <tr>
                                <td height="15" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-18 pc-xs-fs-16 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 10px;" valign="top">
                                  <div style="text-align: left;">Se ha solicitado un cambio de contraseña en Coop. Si no has sido tú, no debes hacer nada. Si has solicitado el cambio, haz click en el botón que aparece a continuación para modificar tu contraseña.</div>
                                </td>
                              </tr>
                              <tr>
                                <td height="25" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td style="padding: 5px 10px;" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td style="border-radius: 8px; padding: 14px 19px; background-color: #1167b1" bgcolor="#1167b1" valign="top" align="center">
                                          <a class="pc-fb-font" href="${
                                              process.env.HOST ||
                                              `http://localhost:${
                                                  process.env.PORT || 3000
                                              }`
                                          }/change-inaction/${token}" style="text-decoration: none; word-break: break-word; line-height: 24px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; color: #ffffff; display: block;">Modificar contraseña</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Transactional 2 -->
                  <!-- BEGIN MODULE: Footer 6 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-38-30-40 pc-xs-p-25-20" style="padding: 38px 40px 40px 40px; background-color: #1167b1; border-radius: 8px" valign="top" bgcolor="#1167b1">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-xs-fs-14" style="text-align: center; font-family: Arial, sans-serif; font-size: 24px;" valign="top">
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/facebook-large-white_yccszw.png" width="20" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/twitter-large-white_xfb6y7.png" width="21" height="18" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/instagram-large-white_isoxsn.png" width="21" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-fb-font" style="text-align: center; line-height: 20px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; color: #ffffff" valign="top">The Coop Spain<br>thecoopspain.herokuapp.com</td>
                              </tr>
                              <tr>
                                <td height="13" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Footer 6 -->
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
                'Verifica este email para cambiar tu contraseña de la cuenta de Coop',
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
      .pc-sm-p-30 {
        padding: 30px !important
      }
      .pc-sm-p-18-30 {
        padding: 18px 30px !important
      }
      .pc-sm-p-30-20-25 {
        padding: 30px 20px 25px !important
      }
      .pc-sm-fs-30 {
        font-size: 30px !important
      }
      .pc-sm-fs-18 {
        font-size: 18px !important
      }
      .pc-sm-p-38-30-40 {
        padding: 38px 30px 40px !important
      }
    }
  </style>
  <style type="text/css">
    @media screen and (max-width:525px) {
      .pc-xs-p-25-20 {
        padding: 25px 20px !important
      }
      .pc-xs-p-18-20 {
        padding: 18px 20px !important
      }
      .pc-xs-p-0 {
        padding: 0 !important
      }
      .pc-xs-p-25-10-20 {
        padding: 25px 10px 20px !important
      }
      .pc-xs-fs-16 {
        font-size: 16px !important
      }
      .pc-xs-br-disabled br {
        display: none !important
      }
      .pc-xs-fs-14 {
        font-size: 14px !important
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
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">Verifica este email para cambiar tu contraseña de la cuenta de Coop</div>
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px;">
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
                  <!-- BEGIN MODULE: Menu 4 -->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td valign="top" bgcolor="#1167b1" style="background-color: #1167b1; border-radius: 8px">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-30 pc-xs-p-25-20" valign="top" align="center" style="padding: 30px 40px;">
                                  <a href="https://thecoopspain.herokuapp.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/white-logo-FVa_buxjn8.png" width="130" height="" alt="" style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="1" bgcolor="#4B4B4B" style="background-color: rgba(255, 255, 255, 0.15); font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-18-30 pc-xs-p-18-20 pc-fb-font pc-sm-p-18-30 pc-xs-p-18-20" valign="top" style="padding: 18px 40px; text-align: center; font-family: Helvetica, sans-serif; line-height: 20px; font-size: 14px" pc-default-class="pc-sm-p-18-30 pc-xs-p-18-20" pc-default-padding="18px 40px">
                                  <a href="https://thecoopspain.herokuapp.com" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Inicio</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/proyectos" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Proyectos</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/voluntariados" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Voluntariados</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/organizaciones" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Organizaciones</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Menu 4 -->
                  <!-- BEGIN MODULE: Transactional 2 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-30-20-25 pc-xs-p-25-10-20" style="padding: 40px 30px 35px; background: #ffffff; border-radius: 8px;" bgcolor="#ffffff" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-30 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 46px; letter-spacing: -0.6px; color: #151515; padding: 0 10px;" valign="top">Modificar contraseña</td>
                              </tr>
                              <tr>
                                <td height="15" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-18 pc-xs-fs-16 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 10px;" valign="top">
                                  <div style="text-align: left;">Se ha solicitado un cambio de contraseña en Coop. Si no has sido tú, no debes hacer nada. Si has solicitado el cambio, haz click en el botón que aparece a continuación para modificar tu contraseña.</div>
                                </td>
                              </tr>
                              <tr>
                                <td height="25" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td style="padding: 5px 10px;" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td style="border-radius: 8px; padding: 14px 19px; background-color: #1167b1" bgcolor="#1167b1" valign="top" align="center">
                                          <a class="pc-fb-font" href="${
                                              process.env.HOST ||
                                              `http://localhost:${
                                                  process.env.PORT || 3000
                                              }`
                                          }/change-inaction-social/${token}" style="text-decoration: none; word-break: break-word; line-height: 24px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; color: #ffffff; display: block;">Modificar contraseña</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Transactional 2 -->
                  <!-- BEGIN MODULE: Footer 6 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-38-30-40 pc-xs-p-25-20" style="padding: 38px 40px 40px 40px; background-color: #1167b1; border-radius: 8px" valign="top" bgcolor="#1167b1">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-xs-fs-14" style="text-align: center; font-family: Arial, sans-serif; font-size: 24px;" valign="top">
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/facebook-large-white_yccszw.png" width="20" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/twitter-large-white_xfb6y7.png" width="21" height="18" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/instagram-large-white_isoxsn.png" width="21" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-fb-font" style="text-align: center; line-height: 20px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; color: #ffffff" valign="top">The Coop Spain<br>thecoopspain.herokuapp.com</td>
                              </tr>
                              <tr>
                                <td height="13" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Footer 6 -->
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
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
      .pc-sm-p-30 {
        padding: 30px !important
      }
      .pc-sm-p-18-30 {
        padding: 18px 30px !important
      }
      .pc-sm-p-30-20-25 {
        padding: 30px 20px 25px !important
      }
      .pc-sm-fs-30 {
        font-size: 30px !important
      }
      .pc-sm-fs-18 {
        font-size: 18px !important
      }
      .pc-sm-p-38-30-40 {
        padding: 38px 30px 40px !important
      }
    }
  </style>
  <style type="text/css">
    @media screen and (max-width:525px) {
      .pc-xs-p-25-20 {
        padding: 25px 20px !important
      }
      .pc-xs-p-18-20 {
        padding: 18px 20px !important
      }
      .pc-xs-p-0 {
        padding: 0 !important
      }
      .pc-xs-p-25-10-20 {
        padding: 25px 10px 20px !important
      }
      .pc-xs-fs-16 {
        font-size: 16px !important
      }
      .pc-xs-br-disabled br {
        display: none !important
      }
      .pc-xs-fs-14 {
        font-size: 14px !important
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
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">Restaura tu contraseña en Coop</div>
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px;">
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
                  <!-- BEGIN MODULE: Menu 4 -->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td valign="top" bgcolor="#1167b1" style="background-color: #1167b1; border-radius: 8px">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-30 pc-xs-p-25-20" valign="top" align="center" style="padding: 30px 40px;">
                                  <a href="https://thecoopspain.herokuapp.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/white-logo-FVa_buxjn8.png" width="130" height="" alt="" style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="1" bgcolor="#4B4B4B" style="background-color: rgba(255, 255, 255, 0.15); font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-18-30 pc-xs-p-18-20 pc-fb-font pc-sm-p-18-30 pc-xs-p-18-20" valign="top" style="padding: 18px 40px; text-align: center; font-family: Helvetica, sans-serif; line-height: 20px; font-size: 14px" pc-default-class="pc-sm-p-18-30 pc-xs-p-18-20" pc-default-padding="18px 40px">
                                  <a href="https://thecoopspain.herokuapp.com" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Inicio</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/proyectos" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Proyectos</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/voluntariados" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Voluntariados</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/organizaciones" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Organizaciones</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Menu 4 -->
                  <!-- BEGIN MODULE: Transactional 2 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-30-20-25 pc-xs-p-25-10-20" style="padding: 40px 30px 35px; background: #ffffff; border-radius: 8px;" bgcolor="#ffffff" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-30 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 46px; letter-spacing: -0.6px; color: #151515; padding: 0 10px;" valign="top">Recupera tu contraseña</td>
                              </tr>
                              <tr>
                                <td height="15" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-18 pc-xs-fs-16 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 10px;" valign="top">
                                  <div style="text-align: left;">Se ha solicitado un cambio de contraseña en Coop. Si no has sido tú, no debes hacer nada. Si has solicitado el cambio, haz click en el botón que aparece a continuación para recuperar tu contraseña.</div>
                                </td>
                              </tr>
                              <tr>
                                <td height="25" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td style="padding: 5px 10px;" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody>
                                      <tr>
                                        <td style="border-radius: 8px; padding: 14px 19px; background-color: #1167b1" bgcolor="#1167b1" valign="top" align="center">
                                          <a class="pc-fb-font" href="${
                                              process.env.HOST ||
                                              `http://localhost:${
                                                  process.env.PORT || 3000
                                              }`
                                          }/reset-password/${token}" style="text-decoration: none; word-break: break-word; line-height: 24px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 500; color: #ffffff; display: block;">Recupera tu contraseña</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Transactional 2 -->
                  <!-- BEGIN MODULE: Footer 6 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-38-30-40 pc-xs-p-25-20" style="padding: 38px 40px 40px 40px; background-color: #1167b1; border-radius: 8px" valign="top" bgcolor="#1167b1">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-xs-fs-14" style="text-align: center; font-family: Arial, sans-serif; font-size: 24px;" valign="top">
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/facebook-large-white_yccszw.png" width="20" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/twitter-large-white_xfb6y7.png" width="21" height="18" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/instagram-large-white_isoxsn.png" width="21" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-fb-font" style="text-align: center; line-height: 20px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; color: #ffffff" valign="top">The Coop Spain<br>thecoopspain.herokuapp.com</td>
                              </tr>
                              <tr>
                                <td height="13" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Footer 6 -->
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
            html: `La organización ${sender} require borrar su cuenta por ${reason}`,
        })
        .then((mail) =>
            console.log('Email de solicitud de eliminar cuenta enviado!')
        )
        .catch((e) => console.log(e))
}

module.exports.deleteProyectRequest = (reciever, sender, project, reason) => {
    transporter
        .sendMail({
            from: `"Coop" <thecoopspain@gmail.com>`,
            to: reciever,
            subject: 'Request to delete project',
            text: 'Quieren borrar un proyecto',
            html: `La organización ${sender} require borrar el pryecto ${project} por ${reason}`,
        })
        .then((mail) =>
            console.log('Email de solicitud de eliminar cuenta enviado!')
        )
        .catch((e) => console.log(e))
}

module.exports.sendInfoEmail = (email, info) => {
    transporter
        .sendMail({
            from: `"Coop" <thecoopspain@gmail.com>`,
            to: email,
            subject: 'Información solicitada',
            text: 'Has solicitado la siguiente información',
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
      .pc-sm-p-30 {
        padding: 30px !important
      }
      .pc-sm-p-18-30 {
        padding: 18px 30px !important
      }
      .pc-sm-p-30-20-25 {
        padding: 30px 20px 25px !important
      }
      .pc-sm-fs-30 {
        font-size: 30px !important
      }
      .pc-sm-fs-18 {
        font-size: 18px !important
      }
      .pc-sm-p-38-30-40 {
        padding: 38px 30px 40px !important
      }
    }
  </style>
  <style type="text/css">
    @media screen and (max-width:525px) {
      .pc-xs-p-25-20 {
        padding: 25px 20px !important
      }
      .pc-xs-p-18-20 {
        padding: 18px 20px !important
      }
      .pc-xs-p-0 {
        padding: 0 !important
      }
      .pc-xs-p-25-10-20 {
        padding: 25px 10px 20px !important
      }
      .pc-xs-fs-16 {
        font-size: 16px !important
      }
      .pc-xs-br-disabled br {
        display: none !important
      }
      .pc-xs-fs-14 {
        font-size: 14px !important
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
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">Has solicitado la siguiente información</div>
  <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px;">
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
                  <!-- BEGIN MODULE: Menu 4 -->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tbody>
                      <tr>
                        <td valign="top" bgcolor="#1167b1" style="background-color: #1167b1; border-radius: 8px">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-30 pc-xs-p-25-20" valign="top" align="center" style="padding: 30px 40px;">
                                  <a href="https://thecoopspain.herokuapp.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/white-logo-FVa_buxjn8.png" width="130" height="" alt="" style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="1" bgcolor="#4B4B4B" style="background-color: rgba(255, 255, 255, 0.15); font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-p-18-30 pc-xs-p-18-20 pc-fb-font pc-sm-p-18-30 pc-xs-p-18-20" valign="top" style="padding: 18px 40px; text-align: center; font-family: Helvetica, sans-serif; line-height: 20px; font-size: 14px" pc-default-class="pc-sm-p-18-30 pc-xs-p-18-20" pc-default-padding="18px 40px">
                                  <a href="https://thecoopspain.herokuapp.com" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Inicio</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/proyectos" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Proyectos</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/voluntariados" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Voluntariados</a>
                                  <span class="pc-xs-p-0" style="padding: 0 23px;">&nbsp;&nbsp;</span>
                                  <a href="https://thecoopspain.herokuapp.com/organizaciones" style="text-decoration: none; color: #ffffff; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500;">Organizaciones</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Menu 4 -->
                  <!-- BEGIN MODULE: Transactional 2 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-30-20-25 pc-xs-p-25-10-20" style="padding: 40px 30px 35px; background: #ffffff; border-radius: 8px;" bgcolor="#ffffff" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-30 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 46px; letter-spacing: -0.6px; color: #151515; padding: 0 10px;" valign="top">Has solicitado la siguiente información:</td>
                              </tr>
                              <tr>
                                <td height="15" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-sm-fs-18 pc-xs-fs-16 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; line-height: 30px; letter-spacing: -0.2px; color: #9B9B9B; padding: 0 10px;" valign="top">
                                  <div style="text-align: left;">${info}</div>
                                </td>
                              </tr>
                              <tr>
                                <td height="25" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Transactional 2 -->
                  <!-- BEGIN MODULE: Footer 6 -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                    <tbody>
                      <tr>
                        <td class="pc-sm-p-38-30-40 pc-xs-p-25-20" style="padding: 38px 40px 40px 40px; background-color: #1167b1; border-radius: 8px" valign="top" bgcolor="#1167b1">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                            <tbody>
                              <tr>
                                <td class="pc-xs-fs-14" style="text-align: center; font-family: Arial, sans-serif; font-size: 24px;" valign="top">
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/facebook-large-white_yccszw.png" width="20" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/twitter-large-white_xfb6y7.png" width="21" height="18" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                  <span>&nbsp;&nbsp;&nbsp;</span>
                                  <a href="http://example.com/" style="text-decoration: none;"><img src="https://res.cloudinary.com/thecoopspain/image/upload/v1615579052/express/default/instagram-large-white_isoxsn.png" width="21" height="20" alt="" style="border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                </td>
                              </tr>
                              <tr>
                                <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                              <tr>
                                <td class="pc-fb-font" style="text-align: center; line-height: 20px; letter-spacing: -0.2px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; color: #ffffff" valign="top">The Coop Spain<br>thecoopspain.herokuapp.com</td>
                              </tr>
                              <tr>
                                <td height="13" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                              </tr>
                            </tbody>
                            <tbody>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- END MODULE: Footer 6 -->
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
</html>`,
        })
        .then((mail) =>
            console.log('Email de solicitud de eliminar cuenta enviado!')
        )
        .catch((e) => console.log(e))
}
