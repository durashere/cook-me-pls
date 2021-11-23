import { Dialog } from '@headlessui/react';
import { MdOutlineDelete } from 'react-icons/md';
import { ReactElement, useState } from 'react';

import Button from '@/components/Button';

interface IDeleteModal {
  description: string;
  onSubmit: () => void;
  title: string;
}

const DeleteModal = ({
  description,
  onSubmit,
  title,
}: IDeleteModal): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        icon={<MdOutlineDelete />}
        onClick={handleToggleModal}
        type="danger"
      >
        Usuń
      </Button>

      <Dialog
        as="div"
        className="fixed inset-0 z-50"
        onClose={handleToggleModal}
        open={isOpen}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <div className="relative max-w-sm p-4 overflow-hidden bg-white rounded-md shadow-xl">
            <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-500">
              {description}
            </Dialog.Description>
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={handleToggleModal}>Anuluj</Button>
              <Button onClick={onSubmit} type="danger">
                Usuń
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteModal;
