import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

import { NodemailerAdapter } from '@/infra/services'

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true)
  })
}))

describe('NodemailerAdapter', () => {
  test('Should call sendMail with correct values', async() => {
    const transporterConfig: SMTPTransport.Options = {
      host: 'smtp.test.com',
      port: 587,
      auth: {
        user: 'test@test.com',
        pass: 'test'
      }
    }
    const sendMailSpy = jest.spyOn(nodemailer.createTransport(transporterConfig), 'sendMail')
    const sut = new NodemailerAdapter(transporterConfig)
    const confirmationCode = '123456'
    const email = 'test@example.com'
    await sut.send(confirmationCode, email)
    expect(sendMailSpy).toHaveBeenCalledWith(expect.objectContaining({
      to: email,
      text: expect.stringContaining(confirmationCode),
      html: expect.stringContaining(confirmationCode)
    }))
  })
})
