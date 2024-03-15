import nodemailer from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import { faker } from '@faker-js/faker'

import { NodemailerAdapter } from '@/infra/services'

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true)
  })
}))

interface Sut {
  sut: NodemailerAdapter
  transporterConfig: SMTPTransport.Options
}

const makeSut = (): Sut => {
  const transporterConfig: SMTPTransport.Options = {
    host: 'smtp.test.com',
    port: 587,
    auth: {
      user: 'test@test.com',
      pass: 'test'
    }
  }
  const sut = new NodemailerAdapter(transporterConfig)
  return {
    sut,
    transporterConfig
  }
}

const confirmationCode: string = faker.string.alphanumeric(6)
const email: string = faker.internet.email()

describe('NodemailerAdapter', () => {
  test('Should call sendMail with correct values', async() => {
    const { sut, transporterConfig } = makeSut()
    const sendMailSpy = jest.spyOn(nodemailer.createTransport(transporterConfig), 'sendMail')
    await sut.send(confirmationCode, email)
    expect(sendMailSpy).toHaveBeenCalledWith(expect.objectContaining({
      to: email,
      text: expect.stringContaining(confirmationCode),
      html: expect.stringContaining(confirmationCode)
    }))
  })
})
