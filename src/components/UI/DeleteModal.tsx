import { Dialog } from '@headlessui/react';
import { ReactElement, useState } from 'react';

import Button from 'components/UI/Button';

interface IDeleteModal {
  description: string;
  onSubmit: () => void;
  title: string;
}

function DeleteModal({
  description,
  onSubmit,
  title,
}: IDeleteModal): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={handleToggleModal}>Usuń</Button>

      <Dialog
        as="div"
        className="fixed inset-0 z-50"
        onClose={handleToggleModal}
        open={isOpen}
      >
        <div className="flex justify-center items-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <div className="overflow-hidden relative p-4 max-w-sm bg-white rounded-md shadow-xl">
            <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-500">
              {description}
            </Dialog.Description>
            <div className="flex gap-4 justify-end mt-4">
              <Button onClick={handleToggleModal} variant="ghost">
                Anuluj
              </Button>
              <Button onClick={onSubmit} variant="solid">
                Usuń
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default DeleteModal;
