import { useEffect, useState } from 'react'
import type { CreateBookModel } from '../BookModel'
import { Button, Input, Modal, Select, Space, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookModal({ onCreate }: CreateBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState<number | null>(null)
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const [photo, setPhoto] = useState('') // Ajout du champ photo
  const { authors, loadAuthors } = useBookAuthorsProviders()

  const onClose = () => {
    setTitle('')
    setYearPublished(null)
    setAuthorId(undefined)
    setPhoto('')
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadAuthors()
    }
  }, [isOpen])

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Book
      </Button>
      <Modal
        title="Ajouter un nouveau livre"
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          if (authorId && yearPublished) {
            onCreate({
              title,
              yearPublished,
              authorId: authorId as string,
              photo: photo || undefined,
            })
            onClose()
          }
        }}
        okButtonProps={{
          disabled: !authorId || !title?.length || !yearPublished,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <span style={{ display: 'block', marginBottom: 8 }}>Titre du livre :</span>
            <Input
              type="text"
              placeholder="Ex: Les Misérables"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: 8 }}>Auteur :</span>
            <Select
              style={{ width: '100%' }}
              placeholder="Sélectionnez l'auteur dans la liste"
              value={authorId}
              options={authors.map(author => ({
                label: `${author.firstName} ${author.lastName}`,
                value: author.id,
              }))}
              onChange={value => setAuthorId(value)}
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: 8 }}>Année de parution :</span>
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Ex: 1862"
              value={yearPublished}
              onChange={value => setYearPublished(value)}
            />
          </div>

          <div>
            <span style={{ display: 'block', marginBottom: 8 }}>Lien de la couverture (Photo) :</span>
            <Input
              type="text"
              placeholder="https://lien-de-votre-image.jpg"
              value={photo}
              onChange={e => setPhoto(e.target.value)}
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}