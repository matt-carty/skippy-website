import { getPermalink } from './utils/permalinks';

const LINE_OA_URL = 'https://line.me/R/ti/p/@skippy-english';

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
        { text: 'アクセス・お問い合わせ', href: getPermalink('/access') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'プライバシーポリシー', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/skippy_english_school/' },
    { ariaLabel: 'LINE', icon: 'tabler:brand-line', href: LINE_OA_URL },
  ],
  footNote: `
    <span class="font-semibold">Skippy English School</span><br />
    〒536-0014 大阪府大阪市城東区鴫野西4丁目 内代町<br />
    © ${new Date().getFullYear()} Skippy English School. All rights reserved.
  `,
};

export { LINE_OA_URL };
