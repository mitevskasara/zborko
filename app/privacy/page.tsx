import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Политика за приватност - Зборко',
  description:
    'Политика за приватност на ЗборКО, македонската Chrome екстензија за објаснување на зборови.',
};

type Section = {
  heading: string;
  body: ReactNode[];
  code?: string;
  list?: string[];
  after?: ReactNode;
};

const sections: Section[] = [
  {
    heading: 'Какви податоци собираме',
    body: [
      <>
        Екстензијата <strong>не собира, не зачувува и не испраќа</strong>{' '}
        податоци за вашата личност, вашите посетени страници, вашата историја на
        прелистување, вашите лозинки или било какви идентификувачки податоци.
      </>,
      <>
        Единствениот податок што се испраќа е{' '}
        <strong>едниот збор што сте го избрале</strong> со селекција. Тој збор
        се испраќа единствено кога побарате објаснување.
      </>,
    ],
  },
  {
    heading: 'Каде се испраќа податоците',
    body: ['Избраниот збор се испраќа на нашиот сервер за барање објаснување:'],
    code: 'https://zborko.vercel.app/api/words?zbor=<избраниот збор>',
    after: (
      <>
        Овој сервер ја обработува барањето и го враќа објаснувањето, кое се
        прикажува во екстензијата.{' '}
        <strong>
          Не се користат third-party аналитички или рекламни алатки
        </strong>
        , и податоците не се продаваат.
      </>
    ),
  },
  {
    heading: 'Локално складирање',
    body: [
      <>
        Вашите поставки (вклучувајќи ги и листата на страници за кои е исклучено
        објаснувањето) се чуваат{' '}
        <strong>исклучиво во вашиот прелистувач</strong>, преку
        chrome.storage.sync на Google. Овие податоци:
      </>,
    ],
    list: [
      'не се испраќаат на нашиот сервер,',
      'се синхронизираат само меѓу вашите сопствени уреди на кои е инсталирана екстензијата, преку вашиот Google профил.',
    ],
    after:
      'Можете да ги избришете во секој момент со отстранување на екстензијата, или со исчистување на податоците за екстензијата во најновата верзија на Chrome.',
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
      'Ако ја промениме оваа политика, ќе ја ажурираме датумот најгоре на страницата.',
    ],
  },
];

export const dynamic = 'force-static';

export default function Privacy() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24 font-sans text-zinc-900">
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
          Политика за приватност
        </h1>
        <p className="mt-3 text-zinc-500">Обновена на 1 октомври 2026</p>
        <p className="mt-6 text-zinc-600 leading-relaxed">
          Оваа политика се однесува на ЗборКО, македонската Chrome екстензија
          која објаснува значење на зборови што ги избирате на веб страница.
        </p>
      </header>

      <div className="space-y-10">
        {sections.map((section) => (
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
          <h2 className="text-xl font-bold text-zinc-900 mb-4">Контакт</h2>
          <p className="text-zinc-600 leading-relaxed">
            За прашања во врска со приватноста, отворете issue на{' '}
            <a
              href="https://github.com/mitevskasara/zborko/issues"
              className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
            >
              GitHub репозиторијум на проектот
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
