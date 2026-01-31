import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('🔍 Configuración detectada:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NO');

async function testEmail() {
  try {
    // Configuración para Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log('🔌 Probando conexión con Gmail...');
    await transporter.verify();
    console.log('✅ Conexión exitosa con Gmail');

    // Enviar test
    const info = await transporter.sendMail({
      from: `"MMF Test" <${process.env.EMAIL_USER}>`,
      to: 'rodriy86@gmail.com',
      subject: '✅ Test desde Backend MMF',
      text: 'Si ves esto, el email funciona correctamente.',
      html: '<h1>✅ Test Exitoso</h1><p>El sistema de email está funcionando.</p>'
    });

    console.log('📧 Email enviado! Message ID:', info.messageId);
    console.log('📨 Preview URL:', nodemailer.getTestMessageUrl(info));
    return true;

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('Código:', error.code);
    
    if (error.response) {
      console.error('Respuesta SMTP:', error.response);
    }
    
    return false;
  }
}

testEmail();