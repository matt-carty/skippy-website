import { getPermalink } from './utils/permalinks';

const LINE_OA_URL = 'https://lin.ee/R2rbgoa';

export const headerData = {
  links: [
    {
      text: 'マットティーチャーについて',
      href: getPermalink('/about'),
    },
    {
      text: 'クラス・スケジュール',
      href: getPermalink('/classes'),
    },
    {
      text: 'よくある質問',
      href: getPermalink('/faq'),
    },
    {
      text: 'お知らせ',
      href: getPermalink('/news'),
    },
    {
      text: 'アクセス',
      href: getPermalink('/access'),
    },
  ],
  actions: [
    {
      text: '無料体験レッスン',
      href: getPermalink('/trial'),
      variant: 'primary' as const,
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'ページ',
      links: [
        { text: 'ホーム', href: getPermalink('/') },
        { text: 'マットティーチャーについて', href: getPermalink('/about') },
        { text: 'クラス・スケジュール', href: getPermalink('/classes') },
        { text: '無料体験レッスン', href: getPermalink('/trial') },
        { text: 'よくある質問', href: getPermalink('/faq') },
        { text: 'お知らせ', href: getPermalink('/news') },
        { text: 'アクセス・お問い合わせ', href: getPermalink('/access') },
      ],
    },
  ],
  secondaryLinks: [{ text: 'プライバシーポリシー', href: getPermalink('/privacy') }],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/skippyenglishschool/' },
    { ariaLabel: 'LINE', icon: 'tabler:brand-line', href: LINE_OA_URL },
  ],
  footNote: `
    <span class="font-semibold">Skippy English School</span><br />
    〒534-0013 大阪府大阪市都島区内代町2-2-23<br />
    © ${new Date().getFullYear()} Skippy English School. All rights reserved.
  `,
};

export { LINE_OA_URL };
