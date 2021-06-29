import { languages } from 'src/config'

export default (req, res, next) => {
  // define default language
  let language = languages.default

  // verify if include
  if (languages.list.includes(req.query.lang)) language = req.query.lang

  // set to res and req object
  req.lang = language
  res.lang = language

  next()
}
