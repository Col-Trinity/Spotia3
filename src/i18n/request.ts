import { getRequestConfig } from 'next-intl/server';

const supportedLocales = ['es', 'en'];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && supportedLocales.includes(requested) ? requested : 'es';
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
