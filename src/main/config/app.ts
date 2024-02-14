import express, { type Express } from 'express'

import { Routes } from '@/main/config'

export class App {
  public static readonly setup = async(): Promise<Express> => {
    const app = express()
    await Routes.setup(app)
    return app
  }
}
