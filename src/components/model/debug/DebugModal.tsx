import {
  chakra,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { BaseButton, BaseModal, BaseModalPropsType } from '@/components/ui';
import { ItemData, RumorData } from '@/data';
import { useUserData } from '@/hooks';

export type DebugModalModalPropsType = BaseModalPropsType;

export const DebugModalModal: FC<DebugModalModalPropsType> = ({
  onClose,
  ...props
}) => {
  const { resetUser, setUser, user } = useUserData();

  const [mode, setMode] = useState<
    'password' | 'debug' | 'itemEdit' | 'rumorEdit'
  >('password');

  const [password, sePassword] = useState('');

  const [menu, setMenu] = useState<'reset' | 'itemEdit' | 'rumorEdit' | ''>('');
  const [itemIds, setItemIds] = useState<number[]>(user?.itemIds || []);
  const [rumorIds, setRumorIds] = useState<number[]>(user?.rumorIds || []);

  useEffect(() => {
    user && setItemIds(user.itemIds);
    user && setRumorIds(user.rumorIds);
  }, [user]);

  const _onClose = () => {
    setMode('password');
    setMenu('');
    sePassword('');
    onClose();
  };

  const onClickDebugEnter = () => {
    if (menu === 'reset') {
      resetUser();
      _onClose();
    }
    if (menu === 'itemEdit') {
      setMode('itemEdit');
    }
    if (menu === 'rumorEdit') {
      setMode('rumorEdit');
    }
  };

  const onChangeItemCheckBox = useCallback(
    (itemId: number, checked: boolean) => {
      setItemIds((ids) =>
        checked ? [...ids, itemId] : ids.filter((id) => id !== itemId),
      );
    },
    [ItemData],
  );

  const onChangeRumorCheckBox = useCallback(
    (rumorId: number, checked: boolean) => {
      setRumorIds((ids) =>
        checked ? [...ids, rumorId] : ids.filter((id) => id !== rumorId),
      );
    },
    [ItemData],
  );

  const onClickEditEnter = () => {
    if (user) {
      setUser({ ...user, itemIds, rumorIds });
    }
    _onClose();
  };

  const passwordModalContent = {
    content: (
      <VStack spacing="2rem">
        <chakra.p textAlign="center">パスワードを入力</chakra.p>

        <FormControl w="15rem">
          <Input
            name="password"
            value={password}
            onChange={(t) => {
              sePassword(t.target.value);
            }}
          ></Input>
        </FormControl>
      </VStack>
    ),
    footer: (
      <Flex gap="3rem">
        <BaseButton h="2rem" onClick={_onClose}>
          閉じる
        </BaseButton>
        <BaseButton
          h="2rem"
          onClick={() => {
            if (password === 'kokoadmin') {
              setMode('debug');
            } else {
              _onClose();
            }
          }}
        >
          決定
        </BaseButton>
      </Flex>
    ),
  };

  const debugModalContent = {
    content: (
      <VStack spacing="2rem">
        <BaseButton
          selectable
          h="4rem"
          selected={menu === 'rumorEdit'}
          onClick={() => setMenu('rumorEdit')}
        >
          うわさ編集
        </BaseButton>
        <BaseButton
          selectable
          h="4rem"
          selected={menu === 'itemEdit'}
          onClick={() => setMenu('itemEdit')}
        >
          アイテム編集
        </BaseButton>
        <BaseButton
          selectable
          h="4rem"
          selected={menu === 'reset'}
          onClick={() => setMenu('reset')}
        >
          ユーザーリセット
        </BaseButton>
      </VStack>
    ),
    footer: (
      <Flex gap="3rem">
        <BaseButton h="2rem" onClick={onClickDebugEnter}>
          決定
        </BaseButton>
      </Flex>
    ),
  };

  const itemEditModalContent = {
    content: (
      <VStack spacing="2rem">
        <CheckboxGroup colorScheme="green" defaultValue={[...(itemIds || [])]}>
          <Stack>
            {ItemData.map((item) => (
              <Checkbox
                isChecked={itemIds.includes(item.id)}
                key={item.id}
                onChange={(e) =>
                  onChangeItemCheckBox(item.id, e.target.checked)
                }
              >
                {item.name}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </VStack>
    ),
    footer: (
      <Flex gap="3rem">
        <BaseButton h="2rem" onClick={onClickEditEnter}>
          決定
        </BaseButton>
      </Flex>
    ),
  };

  const rumorEditModalContent = {
    content: (
      <VStack spacing="2rem">
        <CheckboxGroup colorScheme="green" defaultValue={[...(rumorIds || [])]}>
          <Stack>
            {RumorData.map((rumor) => (
              <Checkbox
                isChecked={rumorIds.includes(rumor.id)}
                key={rumor.id}
                onChange={(e) =>
                  onChangeRumorCheckBox(rumor.id, e.target.checked)
                }
              >
                {rumor.title}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </VStack>
    ),
    footer: (
      <Flex gap="3rem">
        <BaseButton h="2rem" onClick={onClickEditEnter}>
          決定
        </BaseButton>
      </Flex>
    ),
  };

  return (
    <BaseModal
      header={<span>デバッグモード</span>}
      {...(mode === 'password' && passwordModalContent)}
      {...(mode === 'debug' && debugModalContent)}
      {...(mode === 'itemEdit' && itemEditModalContent)}
      {...(mode === 'rumorEdit' && rumorEditModalContent)}
      scrollBehavior={'inside'}
      onClose={_onClose}
      {...props}
    ></BaseModal>
  );
};
