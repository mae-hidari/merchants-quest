import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useMediaQuery,
} from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

export type BaseModalPropsType = Omit<ModalProps, 'children'> & {
  content?: ReactElement;
  footer?: ReactElement;
  header?: ReactElement;
};

export const BaseModal: FC<BaseModalPropsType> = ({
  content,
  footer,
  header,
  ...modalProps
}) => {
  const [isSmallDisplay] = useMediaQuery('(max-width: 375px)');
  const [isMiddleDisplay] = useMediaQuery('(max-width: 420px)');

  return (
    <Modal isCentered autoFocus={false} {...modalProps}>
      <ModalOverlay />
      <ModalContent
        border="2px"
        minH="60%"
        mx={isSmallDisplay ? '1rem' : isMiddleDisplay ? '2rem' : '3rem'}
      >
        {header && (
          <ModalHeader display="flex" justifyContent="center">
            {header}
          </ModalHeader>
        )}
        <ModalBody display="flex" justifyContent="center">
          {content}
        </ModalBody>

        {footer && (
          <ModalFooter display="flex" justifyContent="center">
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
