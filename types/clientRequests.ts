import { Service } from '@/enums/components';
import { Language } from '@/enums/language';

export interface RecentPostsReqQuery {
  category: Service | string[] | '';
  locale?: Language | string;
  num_items?: string | string[] | '';
  current_post?: string | string[] | '';
}

export interface TranslationsReqQuery {
  locale?: Language | string;
}
