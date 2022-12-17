import { ItemType, RumorType } from '@/types';

type SecretWordType = Record<
  string,
  { itemIds: ItemType['id'][]; rumorIds: RumorType['id'][] }
>;

export const SecretWordData: SecretWordType = {
  あさしん: { itemIds: [2, 1, 15], rumorIds: [3, 4, 1] },
  あなろぐ: { itemIds: [15, 7, 12], rumorIds: [10, 7, 9] },
  うちゅう: { itemIds: [21, 3, 12], rumorIds: [5, 6, 9] },
  えりんぎ: { itemIds: [13, 20, 1], rumorIds: [6, 10, 1] },
  おもちゃ: { itemIds: [14, 23, 13], rumorIds: [3, 8, 10] },
  かいほう: { itemIds: [12, 5, 3], rumorIds: [10, 2, 3] },
  かけっこ: { itemIds: [9, 24, 7], rumorIds: [8, 5, 6] },
  かぼちゃ: { itemIds: [4, 8, 18], rumorIds: [3, 9, 2] },
  かみなり: { itemIds: [14, 25, 23], rumorIds: [9, 1, 3] },
  けいやく: { itemIds: [8, 21, 18], rumorIds: [6, 8, 7] },
  ごみばこ: { itemIds: [24, 19, 11], rumorIds: [8, 2, 9] },
  ざいほう: { itemIds: [9, 5, 10], rumorIds: [1, 5, 10] },
  しょうゆ: { itemIds: [10, 6, 23], rumorIds: [1, 5, 10] },
  しんえん: { itemIds: [13, 24, 7], rumorIds: [5, 1, 8] },
  すかうと: { itemIds: [22, 16, 11], rumorIds: [1, 6, 5] },
  すぱいす: { itemIds: [2, 20, 15], rumorIds: [4, 1, 8] },
  せいやく: { itemIds: [25, 6, 9], rumorIds: [9, 6, 4] },
  たいふう: { itemIds: [15, 23, 2], rumorIds: [8, 7, 9] },
  たくあん: { itemIds: [20, 4, 18], rumorIds: [7, 3, 6] },
  でじたる: { itemIds: [22, 5, 8], rumorIds: [3, 4, 5] },
  とらんぷ: { itemIds: [21, 25, 23], rumorIds: [7, 9, 10] },
  どらごん: { itemIds: [3, 4, 14], rumorIds: [6, 2, 4] },
  なぞとき: { itemIds: [16, 1, 24], rumorIds: [4, 2, 6] },
  なるかみ: { itemIds: [13, 5, 14], rumorIds: [2, 9, 1] },
  にゅーす: { itemIds: [16, 21, 7], rumorIds: [4, 8, 2] },
  にんにく: { itemIds: [22, 11, 4], rumorIds: [10, 7, 5] },
  はちみつ: { itemIds: [10, 6, 17], rumorIds: [3, 2, 7] },
  ばらんす: { itemIds: [12, 10, 16], rumorIds: [10, 5, 3] },
  ぴくみん: { itemIds: [], rumorIds: [] },
  ふっかつ: { itemIds: [], rumorIds: [] },
  ぼうけん: { itemIds: [], rumorIds: [] },
  ゆうれい: { itemIds: [], rumorIds: [] },
  ろぼっと: { itemIds: [], rumorIds: [] },
};
