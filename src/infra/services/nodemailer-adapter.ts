import nodemailer, { type Transporter, type SendMailOptions } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

import { type SendConfirmationCodeToEmail } from '@/application/protocols/services'

export class NodemailerAdapter implements SendConfirmationCodeToEmail {
  private readonly transporter: Transporter

  constructor(transporterConfig: SMTPTransport.Options) {
    this.transporter = nodemailer.createTransport({
      ...transporterConfig,
      secure: true,
      tls: {
        rejectUnauthorized: true
      }
    })
  }

  public async send(confirmationCode: string, email: string): Promise<void> {
    const mailOptions: SendMailOptions = {
      from: 'Auth TS',
      to: email,
      subject: 'Your confirmation code',
      text: `Your confirmation code is: ${confirmationCode}`,
      html: `<b>Your confirmation code is:</b> ${confirmationCode}`
    }
    await this.transporter.sendMail(mailOptions)
  }
}
