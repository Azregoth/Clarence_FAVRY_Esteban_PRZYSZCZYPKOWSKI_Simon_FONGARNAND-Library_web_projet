import React, { useState } from 'react';
import { Button, Input, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { CreateAuthorModel } from '../AuthorModel';

interface CreateAuthorModalProps {
  onCreate: (author: CreateAuthorModel) => void;
}

export function CreateAuthorModal({ onCreate }: CreateAuthorModalProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');

  const onClose = (): void => {
    setFirstName('');
    setLastName('');
    setPhoto('');
    setIsOpen(false);
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={(): void => setIsOpen(true)}>
        Ajouter un auteur
      </Button>
      <Modal
        title="Nouvel Auteur"
        open={isOpen}
        onCancel={onClose}
        onOk={(): void => {
          if (firstName && lastName) {
            onCreate({ firstName, lastName, photo: photo || undefined });
            onClose();
          }
        }}
        okButtonProps={{ disabled: !firstName.length || !lastName.length }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <span style={{ display: 'block', marginBottom: 8 }}>Prénom :</span>
            <Input placeholder="Ex: Victor" value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>
          <div>
            <span style={{ display: 'block', marginBottom: 8 }}>Nom :</span>
            <Input placeholder="Ex: Hugo" value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
          <div>
            <span style={{ display: 'block', marginBottom: 8 }}>Photo (URL) :</span>
            <Input placeholder="https://..." value={photo} onChange={e => setPhoto(e.target.value)} />
          </div>
        </Space>
      </Modal>
    </>
  );
}