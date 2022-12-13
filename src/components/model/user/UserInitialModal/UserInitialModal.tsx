import {
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
} from '@chakra-ui/react';
import { FC, useCallback, useMemo, useState } from 'react';

import { BaseButton, BaseModal, BaseModalPropsType } from '@/components/ui';
import { SecretWordData } from '@/data';
import { useUserData } from '@/hooks';

export type UserInitialModalPropsType = BaseModalPropsType;

export const UserInitialModal: FC<UserInitialModalPropsType> = ({
  onClose,
  ...props
}) => {
  const [mode, setMode] = useState<'name' | 'secret'>('name');

  const [name, setName] = useState('');
  const isNameInvalid = useMemo(() => name.length > 4, [name]);

  const [secretWord, setSecretWord] = useState('');
  const isSecretWordInvalid = useMemo(
    () => secretWord.length >= 4 && !SecretWordData[secretWord],
    [secretWord],
  );

  const { setUser } = useUserData();

  const _onClose = () => {
    setMode('name');
    setName('');
    setSecretWord('');
    onClose();
  };

  const onClickStart = useCallback(() => {
    setUser({
      itemIds: SecretWordData[secretWord].itemIds,
      name,
      rumorIds: SecretWordData[secretWord].rumorIds,
    });
    _onClose();
  }, [secretWord, name]);

  const nameModalContent = {
    content: (
      <VStack spacing="2rem">
        <chakra.p textAlign="center">あなたの名前を教えて下さい。</chakra.p>

        <FormControl isInvalid={isNameInvalid} w="15rem">
          <Input
            name="name"
            value={name}
            onChange={(t) => {
              setName(t.target.value);
            }}
          ></Input>
          {!isNameInvalid ? (
            <FormHelperText color="white">※名前は4文字まで </FormHelperText>
          ) : (
            <FormErrorMessage>※名前は4文字まで</FormErrorMessage>
          )}
        </FormControl>
      </VStack>
    ),
    footer: (
      <Flex>
        <BaseButton
          disabled={name.length < 1 || isNameInvalid}
          h="2rem"
          onClick={() => {
            setMode('secret');
          }}
        >
          決定
        </BaseButton>
      </Flex>
    ),
  };

  const secretModalContent = {
    content: (
      <VStack spacing="2rem">
        <chakra.p textAlign="center">
          ようこそ、{name}さん。
          <br />
          あなたの秘密の言葉を教えて下さい。
        </chakra.p>

        <FormControl isInvalid={isSecretWordInvalid} w="15rem">
          <Input
            name="secretWord"
            value={secretWord}
            onChange={(t) => {
              setSecretWord(t.target.value);
            }}
          ></Input>
          {isSecretWordInvalid && (
            <FormErrorMessage>※秘密の言葉が見つかりません</FormErrorMessage>
          )}
        </FormControl>
      </VStack>
    ),
    footer: (
      <Flex>
        <BaseButton
          disabled={secretWord.length < 4 || isSecretWordInvalid}
          h="2rem"
          onClick={onClickStart}
        >
          冒険を始める
        </BaseButton>
      </Flex>
    ),
  };

  return (
    <BaseModal
      header={<span>冒険の記録を作成</span>}
      {...(mode === 'name' && nameModalContent)}
      {...(mode === 'secret' && secretModalContent)}
      onClose={_onClose}
      {...props}
    ></BaseModal>
  );
};
