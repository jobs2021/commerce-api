import 'reflect-metadata'
import expressLoader from './express'
import mongoLoader from './mongo'
import i18nLoader from './i18n'

export default async ({ app } = {}) => {

  // load mongo
  const mongo = await mongoLoader

  // load i18n internationalization
  const i18n = i18nLoader.init()

  // load express app
  const express = await expressLoader(app.port, app.ip)

  return { i18n, express, mongo }
}
