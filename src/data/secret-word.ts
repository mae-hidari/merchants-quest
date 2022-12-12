import { ItemType, RumorType } from '@/types';

type SecretWordType = Record<
  string,
  { itemIds: ItemType['id'][]; rumorIds: RumorType['id'][] }
>;

export const SecretWordData: SecretWordType = {
  あさしん: { itemIds: [1, 2], rumorIds: [1, 2] },
  あなろぐ: { itemIds: [], rumorIds: [] },
  うちゅう: { itemIds: [], rumorIds: [] },
  えりんぎ: { itemIds: [], rumorIds: [] },
  おもちゃ: { itemIds: [], rumorIds: [] },
  かいほう: { itemIds: [], rumorIds: [] },
  かけっこ: { itemIds: [], rumorIds: [] },
  かぼちゃ: { itemIds: [], rumorIds: [] },
  かみなり: { itemIds: [], rumorIds: [] },
  けいやく: { itemIds: [], rumorIds: [] },
  ごみばこ: { itemIds: [], rumorIds: [] },
  ざいほう: { itemIds: [], rumorIds: [] },
  しょうゆ: { itemIds: [], rumorIds: [] },
  しんえん: { itemIds: [], rumorIds: [] },
  すかうと: { itemIds: [], rumorIds: [] },
  すぱいす: { itemIds: [], rumorIds: [] },
  せいやく: { itemIds: [], rumorIds: [] },
  たいふう: { itemIds: [], rumorIds: [] },
  でじたる: { itemIds: [], rumorIds: [] },
  とらんぷ: { itemIds: [], rumorIds: [] },
  どらごん: { itemIds: [], rumorIds: [] },
  なぞとき: { itemIds: [], rumorIds: [] },
  なるかみ: { itemIds: [], rumorIds: [] },
  にゅーす: { itemIds: [], rumorIds: [] },
  にんにく: { itemIds: [], rumorIds: [] },
  はちみつ: { itemIds: [], rumorIds: [] },
  ばらんす: { itemIds: [], rumorIds: [] },
  ぴくみん: { itemIds: [], rumorIds: [] },
  ふっかつ: { itemIds: [], rumorIds: [] },
  ぼうけん: { itemIds: [], rumorIds: [] },
  ゆうれい: { itemIds: [], rumorIds: [] },
  ろぼっと: { itemIds: [], rumorIds: [] },
};
