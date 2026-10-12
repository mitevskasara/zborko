export interface IWord {
  id: number;
  zbor: string;
  vid: string;
  rod: string | null;
  znacenje: string;
}

export interface ISimilarWord {
  zbor: string;
  vid: string;
}

export type TWordMatch = 'exact' | 'prefix-of-query' | 'query-is-prefix';

export interface IWordResponse extends IWord {
  random?: boolean;
  match?: TWordMatch;
  similarWords?: ISimilarWord[];
}
