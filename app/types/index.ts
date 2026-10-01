interface IWord {
  id: number;
  zbor: string;
  vid: string;
  rod: string | null;
  znacenje: string;
}

interface ISimilarWord {
  zbor: string;
  vid: string;
}

type TWordMatch = 'exact' | 'prefix-of-query' | 'query-is-prefix';

interface IWordResponse extends IWord {
  random?: boolean;
  match?: TWordMatch;
  similarWords?: ISimilarWord[];
}
