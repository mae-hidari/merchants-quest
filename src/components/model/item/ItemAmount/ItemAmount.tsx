import { WarningTwoIcon } from '@chakra-ui/icons';
import { chakra, Flex, FlexProps, useDisclosure } from '@chakra-ui/react';
import { FC, useMemo } from 'react';

import { BaseButton, BaseImage, BaseModal } from '@/components/ui';
import { UserType } from '@/types';

export type ItemAmountPropsType = FlexProps & {
  user: UserType;
};

export const ItemAmount: FC<ItemAmountPropsType> = ({ user, ...props }) => {
  const isExcess = useMemo(() => user.itemIds.length > 4, [user]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const modalElements = {
    content: (
      <Flex alignItems="center" w="full">
        <chakra.p>
          アイテム所持数が上限を超えています。
          <br />
          ゲーム終了時にアイテム所持数が上限を超えている場合、 <br />
          ゲームから脱落になります。
          <br />
          捨てるか、他の人に渡して所持数を減らしてください。
        </chakra.p>
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <BaseButton h="2rem" onClick={onClose}>
          閉じる
        </BaseButton>
      </Flex>
    ),
    header: <span>注意！</span>,
  };

  const _onOpen = () => {
    if (!isExcess) return;
    onOpen();
  };

  return (
    <>
      <Flex alignItems="center" gap="0.4rem" onClick={_onOpen} {...props}>
        <BaseImage
          alt={'かばん'}
          height="22px"
          src={`/image/bag.png`}
          width="22px"
        />

        <Flex
          alignItems="center"
          color={isExcess ? 'red' : 'white'}
          gap="0.1rem"
        >
          {isExcess && <WarningTwoIcon color="red" />}
          {`${user.itemIds.length}/4`}
        </Flex>
      </Flex>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        {...modalElements}
      ></BaseModal>
    </>
  );
};
