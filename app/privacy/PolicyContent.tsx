'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

type Section = {
  heading: string;
  body: ReactNode[];
  code?: string;
  list?: string[];
  after?: ReactNode;
};

type Lang = 'mk' | 'en';

type Content = {
  lang: Lang;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: Section[];
  contactHeading: string;
  contactBody: ReactNode;
};

const content: Record<Lang, Content> = {
  mk: {
    lang: 'mk',
    title: 'Политика за приватност',
    updated: 'Обновена на 1 октомври 2026',
    intro: (
      <>
        Оваа политика се однесува на Зборко, македонска веб-екстензија која го
        објаснува значењето на зборовите што ги избирате на било која
        веб-страница.
      </>
    ),
    sections: [
      {
        heading: 'Какви податоци собираме',
        body: [
          <>
            Екстензијата <strong>не собира, не зачувува и не испраќа</strong>{' '}
            податоци за вашата личност, вашите посетени страници, вашата историја
            на прелистување, вашите лозинки или било какви идентификувачки
            податоци.
          </>,
          <>
            Единствениот податок што се испраќа е{' '}
            <strong>зборот што сте го избрале</strong> со селекција. Тој збор се
            испраќа единствено кога побарувате објаснување.
          </>,
        ],
      },
      {
        heading: 'Каде се испраќаат податоците',
        body: [
          'Избраниот збор се испраќа на нашиот сервер за барање објаснување:',
        ],
        code: 'https://zborko.vercel.app/api/words?zbor=<избраниот збор>',
        after: (
          <>
            Овој сервер го обработува барањето и го враќа објаснувањето, кое се
            прикажува во екстензијата.{' '}
            <strong>
              Не се користат аналитички или рекламни алатки од трети страни
            </strong>
            , и податоците не се продаваат.
          </>
        ),
      },
      {
        heading: 'Локално складирање',
        body: [
          <>
            Вашите поставки (вклучувајќи ја и листата на страници за кои е
            исклучено објаснувањето) се чуваат{' '}
            <strong>исклучиво во вашиот прелистувач</strong>, преку
            синхронизираното складирање на екстензијата. Овие податоци:
          </>,
        ],
        list: [
          'не се испраќаат на нашиот сервер,',
          'се синхронизираат само меѓу вашите сопствени уреди на кои е инсталирана екстензијата, преку профилот во вашиот прелистувач.',
        ],
        after:
          'Можете да ги избришете во секој момент со отстранување на екстензијата, или со исчистување на податоците за екстензијата во вашиот прелистувач.',
      },
      {
        heading: 'Чувствителни податоци',
        body: [
          'Не собираме и не обработуваме податоци за деца, чувствителни лични податоци или податоци поврзани со здравје, финансии или вера.',
        ],
      },
      {
        heading: 'Промени во политиката',
        body: [
          'Ако ја промениме оваа политика, ќе го ажурираме датумот во горниот дел на страницата.',
        ],
      },
    ],
    contactHeading: 'Контакт',
    contactBody: (
      <>
        За прашања во врска со приватноста, пријавете проблем на{' '}
        <a
          href="https://github.com/mitevskasara/zborko/issues"
          className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
        >
          GitHub репозиториум на проектот
        </a>
        .
      </>
    ),
  },
  en: {
    lang: 'en',
    title: 'Privacy Policy',
    updated: 'Last updated October 1, 2026',
    intro: (
      <>
        This policy applies to Zborko, the Macedonian web extension that explains
        the meaning of words you select on any web page.
      </>
    ),
    sections: [
      {
        heading: 'What data we collect',
        body: [
          <>
            The extension <strong>does not collect, store, or send</strong> data
            about your identity, the pages you visit, your browsing history, your
            passwords, or any identifying information.
          </>,
          <>
            The only data sent is <strong>the word you selected</strong>. That
            word is sent only when you request an explanation.
          </>,
        ],
      },
      {
        heading: 'Where the data is sent',
        body: [
          'The selected word is sent to our server to request an explanation:',
        ],
        code: 'https://zborko.vercel.app/api/words?zbor=<selected word>',
        after: (
          <>
            This server processes the request and returns the explanation, which
            is displayed in the extension.{' '}
            <strong>
              No third-party analytics or advertising tools are used
            </strong>
            , and the data is not sold.
          </>
        ),
      },
      {
        heading: 'Local storage',
        body: [
          <>
            Your settings (including the list of pages where explanations are
            disabled) are stored{' '}
            <strong>exclusively in your browser</strong>, through the
            extension&apos;s synchronized storage. This data:
          </>,
        ],
        list: [
          'is not sent to our server,',
          'is synchronized only between your own devices where the extension is installed, through your browser profile.',
        ],
        after:
          "You can delete it at any time by removing the extension, or by clearing the extension's data in your browser.",
      },
      {
        heading: 'Sensitive data',
        body: [
          'We do not collect or process data about children, sensitive personal data, or data related to health, finances, or religion.',
        ],
      },
      {
        heading: 'Changes to the policy',
        body: [
          'If we change this policy, we will update the date at the top of the page.',
        ],
      },
    ],
    contactHeading: 'Contact',
    contactBody: (
      <>
        For privacy questions, report a problem on{' '}
        <a
          href="https://github.com/mitevskasara/zborko/issues"
          className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
        >
          the project&apos;s GitHub repository
        </a>
        .
      </>
    ),
  },
};

function Policy({ data }: { data: Content }) {
  return (
    <div lang={data.lang}>
      <header className="mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-600 rounded-full mb-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
          {data.title}
        </h1>
        <p className="mt-3 text-zinc-500">{data.updated}</p>
        <p className="mt-6 text-zinc-600 leading-relaxed">{data.intro}</p>
      </header>

      <div className="space-y-10">
        {data.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">
              {section.heading}
            </h2>
            {section.body.map((paragraph, index) => (
              <p
                key={index}
                className="text-zinc-600 leading-relaxed mb-3 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
            {section.code && (
              <pre className="mt-4 mb-3 bg-zinc-50 border border-zinc-200 rounded-2xl p-4 overflow-x-auto text-sm text-zinc-700">
                <code>{section.code}</code>
              </pre>
            )}
            {section.list && (
              <ul className="list-disc pl-5 space-y-2 text-zinc-600 leading-relaxed">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.after && (
              <p className="text-zinc-600 leading-relaxed mt-3">
                {section.after}
              </p>
            )}
          </section>
        ))}

        <section>
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            {data.contactHeading}
          </h2>
          <p className="text-zinc-600 leading-relaxed">{data.contactBody}</p>
        </section>
      </div>
    </div>
  );
}

export default function PolicyContent() {
  const [lang, setLang] = useState<Lang>('mk');

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24 font-sans text-zinc-900">
      <div className="flex justify-end mb-8">
        <div className="inline-flex rounded-full border border-zinc-200 p-1 text-sm">
          {(['mk', 'en'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLang(option)}
              aria-pressed={lang === option}
              className={`px-4 py-1 rounded-full transition-colors ${
                lang === option
                  ? 'bg-emerald-600 text-white'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {option === 'mk' ? 'МК' : 'EN'}
            </button>
          ))}
        </div>
      </div>

      <div hidden={lang !== 'mk'}>
        <Policy data={content.mk} />
      </div>
      <div hidden={lang !== 'en'}>
        <Policy data={content.en} />
      </div>
    </div>
  );
}
