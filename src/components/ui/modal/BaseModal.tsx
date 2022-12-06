import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
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
  return (
    <Modal isCentered {...modalProps}>
      <ModalOverlay />
      <ModalContent border="2px" minH="60%" mx="3rem">
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
