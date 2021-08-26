import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@/components/Button';

const DeleteModal = ({ description, onSubmit, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} type="danger" icon="delete">
        Usuń
      </Button>

      <Dialog as="div" className="fixed inset-0 z-50" onClose={handleToggleModal} open={isOpen}>
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

DeleteModal.propTypes = {
  description: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteModal;
