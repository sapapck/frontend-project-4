/* eslint-disable */
import page404 from '../img/page404.jpg';
import { useTranslation } from 'react-i18next';
const P404 = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt={t('errors.notFound')} src={page404}></img>
      <h1 className="text-muted">{t('errors.notFound')}</h1>
      <p className="text-muted">
        {t('page404.youCanGo')} <a href="/">{t('page404.home')}</a>
      </p>
    </div>
  );
};
export default P404;
