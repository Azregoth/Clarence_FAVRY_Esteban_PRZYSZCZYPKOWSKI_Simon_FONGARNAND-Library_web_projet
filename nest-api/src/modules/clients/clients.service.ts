import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity, type ClientId } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  public async create(dto: CreateClientDto): Promise<ClientEntity> {
    const client: ClientEntity = this.clientRepository.create(dto);
    return this.clientRepository.save(client);
  }

  public async findAll(): Promise<ClientEntity[]> {
    // On inclut les ventes et les livres associés pour faciliter les calculs côté Front
    return this.clientRepository.find({
      relations: { sales: { book: true } },
    });
  }

  public async findOne(id: ClientId): Promise<ClientEntity> {
    const client: ClientEntity | null = await this.clientRepository.findOne({
      where: { id },
      relations: { sales: { book: true } },
    });
    
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    
    return client;
  }

  public async update(id: ClientId, dto: Partial<CreateClientDto>): Promise<ClientEntity> {
    await this.clientRepository.update(id, dto);
    return this.findOne(id);
  }

  public async remove(id: ClientId): Promise<void> {
    await this.clientRepository.delete(id);
  }
}