import { chakra, Flex } from '@chakra-ui/react';
import { FC } from 'react';

import { BaseButton, BaseModal, BaseModalPropsType } from '@/components/ui';
import { UserType } from '@/types';

export type ItemCanNotImportModalPropsType = Omit<
  BaseModalPropsType,
  'children'
> & {
  user: UserType | null;
};

export const ItemCanNotImportModal: FC<ItemCanNotImportModalPropsType> = ({
  isOpen,
  onClose,
}) => {
  return (
    <BaseModal
      content={
        <Flex alignItems="center" w="full">
          <chakra.p>
            アイテム所持数が上限を超えています。
            <br />
            アイテムを新たに受け取ることはできません。
            <br />
            捨てるか、他の人に渡して所持数を減らしてください。
          </chakra.p>
        </Flex>
      }
      footer={
        <Flex gap="1rem">
          <BaseButton h="2rem" onClick={onClose}>
            閉じる
          </BaseButton>
        </Flex>
      }
      header={<span>袋がもういっぱいだ！</span>}
      isOpen={isOpen}
      onClose={onClose}
    ></BaseModal>
  );
};
