import { Skeleton, Space, Typography, Button, Card, Form, Input, List, Modal, Select, DatePicker } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'
import axios from 'axios'
import type { UpdateBookModel } from '../BookModel'

interface BookDetailsProps {
  id: string
}

// Typage minimal du client pour le select
interface ClientMinimal {
  id: string
  firstName: string
  lastName: string
}

interface BuyFormValues {
  clientId: string
  date: { toDate: () => Date }
}

export const BookDetails = ({ id }: BookDetailsProps): React.ReactElement => {
  const { isLoading, book, loadBook, updateBook, recordSale } = useBookDetailsProvider(id)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [isBuyModalOpen, setIsBuyModalOpen] = useState<boolean>(false)
  const [clients, setClients] = useState<ClientMinimal[]>([])
  
  const [editForm] = Form.useForm<UpdateBookModel>()
  const [buyForm] = Form.useForm<BuyFormValues>()

  useEffect((): void => {
    loadBook()
  }, [id])

  // Met à jour le formulaire d'édition quand le livre charge
  useEffect((): void => {
    if (book) editForm.setFieldsValue(book)
  }, [book, editForm])

  const openBuyModal = (): void => {
    // On charge les clients uniquement quand on ouvre la modale
    axios.get('http://localhost:3000/clients')
      .then(response => setClients(response.data))
      .catch(console.error)
    setIsBuyModalOpen(true)
  }

  const handleUpdate = (values: UpdateBookModel): void => {
    updateBook(values)
    setEditMode(false)
  }

  const handleBuy = async (values: BuyFormValues): Promise<void> => {
    try {
      await recordSale(values.clientId, values.date.toDate())
      setIsBuyModalOpen(false)
      buyForm.resetFields()
    } catch (e) {
      // Erreur déjà gérée dans le provider
    }
  }

  if (isLoading && !book) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%', marginTop: 16 }}>
      <Link to={booksRoute.to} style={{ fontSize: '1.2rem', marginBottom: 16, display: 'inline-block' }}>
        <ArrowLeftOutlined /> Retour aux livres
      </Link>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <Card title="Détails du Livre" style={{ flex: 1, minWidth: '300px' }}>
          {!editMode ? (
            <div>
              {book?.photo && <img src={book.photo} alt="Couverture" style={{ height: 150, marginBottom: 16 }} />}
              <Typography.Title level={2}>{book?.title}</Typography.Title>
              <Typography.Title level={4} type="secondary">Par {book?.author.firstName} {book?.author.lastName}</Typography.Title>
              <Typography.Paragraph><strong>Année :</strong> {book?.yearPublished}</Typography.Paragraph>
              
              <Space style={{ marginTop: 16 }}>
                <Button type="primary" onClick={(): void => setEditMode(true)}>Éditer</Button>
                <Button type="primary" danger onClick={openBuyModal}>Enregistrer un Achat</Button>
              </Space>
            </div>
          ) : (
            <Form<UpdateBookModel> form={editForm} layout="vertical" onFinish={handleUpdate}>
              <Form.Item name="title" label="Titre" rules={[{ required: true }]}><Input /></Form.Item>
              <Form.Item name="yearPublished" label="Année" rules={[{ required: true }]}><Input type="number" /></Form.Item>
              <Form.Item name="photo" label="Photo (URL)"><Input /></Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>Sauvegarder</Button>
              <Button onClick={(): void => setEditMode(false)}>Annuler</Button>
            </Form>
          )}
        </Card>

        <Card title="Liste des Acheteurs" style={{ flex: 1, minWidth: '300px' }}>
          <List
            itemLayout="horizontal"
            dataSource={book?.sales || []}
            renderItem={(sale): React.ReactElement => (
              <List.Item>
                <List.Item.Meta
                  title={<Link to="/clients/$clientId" params={{ clientId: sale.client.id }}>{sale.client.firstName} {sale.client.lastName}</Link>}
                  description={`Acheté le : ${new Date(sale.date).toLocaleDateString()}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      <Modal
        title="Enregistrer un Achat"
        open={isBuyModalOpen}
        onCancel={(): void => setIsBuyModalOpen(false)}
        onOk={(): void => buyForm.submit()}
      >
        <Form<BuyFormValues> form={buyForm} layout="vertical" onFinish={handleBuy}>
          <Form.Item 
            name="clientId" 
            label="Client Acheteur" 
            rules={[{ required: true, message: 'Veuillez sélectionner un client' }]}
          >
            <Select placeholder="Sélectionnez un client">
              {clients.map(client => (
                <Select.Option key={client.id} value={client.id}>
                  {client.firstName} {client.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item 
            name="date" 
            label="Date d'achat" 
            rules={[{ required: true, message: 'Veuillez choisir une date' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
}