import i18n from 'src/core/i18n'

export default (lang, label, props) => {
  // set current language
  i18n.setLocale(lang)

  // get the label
  // eslint-disable-next-line no-underscore-dangle
  const text = i18n.__(label, props)

  // return
  return text
}
