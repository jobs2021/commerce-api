import i18n from 'i18n'
import { languages } from 'src/config'
import path from 'path'

// initialice i18n config
i18n.configure({
  updateFiles: false,
  locales: languages.list,
  directory: path.join(__dirname, '../../constants/locales'),
})

export default i18n
