import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async (req, res) => {
  const { name, lastName, email, message } = req.body;

  if (!name || !lastName || !email || !message) {
    return res
      .status(400)
      .json({ message: "Faltan datos: nombre, apellido, email o mensaje." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name} ${lastName}" <${email}>`,
      to: process.env.CONTACT_TO,
      subject: `📬 Nuevo lead campaña ${name} ${lastName}`,
      text: `
Has recibido un nuevo mensaje desde el formulario de contacto.

👤 Nombre: ${name}
👤 Apellido: ${lastName}
📧 Email: ${email}

💬 Mensaje:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Correo enviado exitosamente ✅" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo ❌", error });
  }
};
