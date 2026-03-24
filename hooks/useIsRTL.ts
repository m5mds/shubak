import { useLocale } from '../lib/i18n/context';

export const useIsRTL = () => {
  const { dir } = useLocale();
  return dir === 'rtl';
};
