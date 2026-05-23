import { defineConfig } from 'tinacms';
import type { TinaField } from 'tinacms';

const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

// ─── School Settings ────────────────────────────────────────────────────────
// Matthew can edit these via the TinaCMS admin UI without touching code.
// File lives at: content/settings/school.json

const schoolSettingsFields: TinaField[] = [
  {
    type: 'string',
    name: 'lineOaUrl',
    label: 'LINE OA URL',
    description: 'LINE公式アカウントのURL（例: https://line.me/R/ti/p/@skippy-english）',
    required: true,
  },
  {
    type: 'string',
    name: 'email',
    label: 'メールアドレス',
  },
  {
    type: 'string',
    name: 'instagramUrl',
    label: 'Instagram URL',
  },
  {
    type: 'string',
    name: 'address',
    label: '住所',
    ui: { component: 'textarea' },
  },
  {
    type: 'string',
    name: 'googleMapsEmbedUrl',
    label: 'Googleマップ埋め込みURL',
    description: 'Google MapsのiFrame src="" の値を入力してください',
    ui: { component: 'textarea' },
  },
];

// ─── Class Schedule ──────────────────────────────────────────────────────────
// Matthew updates class days/times here — no code deploy needed.

const classScheduleFields: TinaField[] = [
  {
    type: 'object',
    name: 'preKids',
    label: 'プレKids（2〜3歳）',
    fields: [
      { type: 'string', name: 'schedule', label: 'レッスン日時', ui: { component: 'textarea' } },
      { type: 'string', name: 'capacity', label: '定員（例: 6名）' },
      { type: 'boolean', name: 'acceptingEnrollment', label: '募集中' },
    ],
  },
  {
    type: 'object',
    name: 'kids',
    label: 'Kidsクラス（4〜5歳）',
    fields: [
      { type: 'string', name: 'schedule', label: 'レッスン日時', ui: { component: 'textarea' } },
      { type: 'string', name: 'capacity', label: '定員（例: 8名）' },
      { type: 'boolean', name: 'acceptingEnrollment', label: '募集中' },
    ],
  },
  {
    type: 'object',
    name: 'junior',
    label: 'Juniorクラス（6〜8歳）',
    fields: [
      { type: 'string', name: 'schedule', label: 'レッスン日時', ui: { component: 'textarea' } },
      { type: 'string', name: 'capacity', label: '定員（例: 8名）' },
      { type: 'boolean', name: 'acceptingEnrollment', label: '募集中' },
    ],
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────

const testimonialFields: TinaField[] = [
  {
    type: 'string',
    name: 'quote',
    label: '保護者のコメント（引用）',
    required: true,
    ui: { component: 'textarea' },
  },
  {
    type: 'string',
    name: 'attribution',
    label: '掲載名（例: 佐藤さん（お子さん4歳・Kidsクラス））',
    required: true,
  },
  {
    type: 'boolean',
    name: 'featured',
    label: 'トップページに表示',
  },
  {
    type: 'image',
    name: 'photo',
    label: '保護者写真（任意・同意書必要）',
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqFields: TinaField[] = [
  {
    type: 'string',
    name: 'question',
    label: '質問',
    isTitle: true,
    required: true,
  },
  {
    type: 'string',
    name: 'answer',
    label: '回答',
    required: true,
    ui: { component: 'textarea' },
  },
  {
    type: 'string',
    name: 'category',
    label: 'カテゴリ',
    options: ['メソッドについて', 'スクールについて', '体験・入会について', 'アクセス・実際のレッスンについて'],
  },
  {
    type: 'number',
    name: 'order',
    label: '表示順（数字が小さいほど上に表示）',
  },
];

// ─── Photo Gallery ───────────────────────────────────────────────────────────

const photoFields: TinaField[] = [
  {
    type: 'image',
    name: 'src',
    label: '写真',
    required: true,
  },
  {
    type: 'string',
    name: 'alt',
    label: '説明文（代替テキスト・SEO用）',
    required: true,
  },
  {
    type: 'string',
    name: 'category',
    label: 'カテゴリ',
    options: ['classroom', 'matthew', 'exterior', 'students', 'arrival'],
  },
  {
    type: 'boolean',
    name: 'usedInHero',
    label: 'トップページのヒーロー画像として使用',
  },
];

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      // ── School settings (singleton) ──────────────────────────
      {
        name: 'schoolSettings',
        label: 'スクール設定',
        path: 'content/settings',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        match: { include: 'school' },
        fields: schoolSettingsFields,
      },

      // ── Class schedule (singleton) ───────────────────────────
      {
        name: 'classSchedule',
        label: 'クラス・スケジュール',
        path: 'content/settings',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        match: { include: 'schedule' },
        fields: classScheduleFields,
      },

      // ── Testimonials (multiple) ──────────────────────────────
      {
        name: 'testimonial',
        label: '保護者の声',
        path: 'content/testimonials',
        format: 'json',
        fields: testimonialFields,
      },

      // ── FAQ items (multiple) ─────────────────────────────────
      {
        name: 'faq',
        label: 'よくある質問',
        path: 'content/faq',
        format: 'json',
        fields: faqFields,
      },

      // ── Photo gallery (multiple) ─────────────────────────────
      {
        name: 'photo',
        label: '写真ギャラリー',
        path: 'content/photos',
        format: 'json',
        fields: photoFields,
      },
    ],
  },
});
