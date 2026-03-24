import { getTranslations } from 'next-intl/server';
import HeroSwiper from './HeroSwiper';

export async function Hero({ locale = 'es' }: { locale?: string }) {
    const tHero = await getTranslations('hero');
    const tLogin = await getTranslations('login');

    return (
        <HeroSwiper
            heroTitle={tHero('title')}
            heroDescription={tHero('description')}
            loginTitle={tLogin('connectMusic')}
            loginDescription={tLogin('description')}
            loginContinueWith={tLogin('continueWith')}
            locale={locale}
        />
    );
}
