import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Flex,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { FC } from 'react';

import { BaseButton, BaseModal, BaseModalPropsType } from '@/components/ui';

export type InfoModalPropsType = BaseModalPropsType;

export const InfoModal: FC<InfoModalPropsType> = ({ onClose, ...props }) => {
  return (
    <BaseModal
      content={
        <Flex alignItems="left" flexDirection="column" gap="1rem" w="full">
          <Box>
            <Heading as="h3" size="sm">
              ゲームの概要
            </Heading>
            <chakra.p fontSize="0.9rem">
              あなたはファンタジー世界の商人なりました。
              <br />
              他の商人たちとアイテムや情報を交渉、交換して、できるだけ価値の高いアイテムを集めましょう！
              <br />
              ただし、アイテムの価値は変わることがあります。
              <br />
              ゲーム終了時、持っているアイテムの組み合わせによってアイテムの価値が増減することがあります。
              <br />
              アイテムの組み合わせはうわさがヒントになっているので、うわさも集めることや交渉の材料にすることも意識しましょう。
            </chakra.p>
          </Box>
          <Box>
            <Heading as="h3" size="sm">
              ゲームの勝利条件
            </Heading>
            <chakra.p fontSize="0.9rem">
              ゲーム終了時、所持しているアイテムの価値の合計が一番高かった人の勝利。
              <br />
              アイテムの価値はゲーム終了時に組み合わせによって変動するので注意。
            </chakra.p>
          </Box>
          <Box>
            <Heading as="h3" size="sm">
              ゲームのルール
            </Heading>
            <UnorderedList fontSize="0.9rem" pl="0.5rem">
              <ListItem>
                他の人に直接見せていいのでは、
                <strong>QRコードが表示されている画面のみ </strong>。
              </ListItem>
              <ListItem>
                交渉の際に嘘をついてもよいが、
                <strong>事前に決めた交換の条件を破ってはいけない</strong>。
                <br />
                例：アイテムAとアイテムBを交換する条件でアイテムAを受け取ったのに、アイテムBを渡さずに逃げるなど。
              </ListItem>
              <ListItem>
                所持アイテム数の上限は4つまで。
                <br />
                アプリの都合上、実際に持てるアイテムの個数は5つですが、
                <strong>
                  ゲーム終了時に5つ以上アイテムを持っていた人は脱落するので注意。
                </strong>
              </ListItem>
              <ListItem>アイテムは渡すと無くなる。</ListItem>
              <ListItem>同じアイテムを複数持つことはできない。</ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Heading as="h3" size="sm">
              素材をお借りしたサイト様
            </Heading>

            <UnorderedList fontSize="0.9rem" pl="0.5rem">
              <ListItem>
                <Link isExternal href="http://monookigoya.jp/">
                  まったりさんの物置小屋 <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
              <ListItem>
                <Link isExternal href="https://booth.pm/ja/items/1091684">
                  ジュウニ/朱色の糸くず <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
              <ListItem>
                <Link isExternal href="http://zioru.x0.to/">
                  Un Almacen <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      }
      footer={
        <Flex>
          <BaseButton h="2rem" onClick={onClose}>
            閉じる
          </BaseButton>
        </Flex>
      }
      header={<span>遊び方</span>}
      onClose={onClose}
      {...props}
    ></BaseModal>
  );
};
