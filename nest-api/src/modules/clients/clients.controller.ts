import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientEntity, type ClientId } from './entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  public async create(@Body() createClientDto: CreateClientDto): Promise<ClientEntity> {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  public async findAll(): Promise<ClientEntity[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ClientEntity> {
    return this.clientsService.findOne(id as ClientId);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateClientDto: Partial<CreateClientDto>,
  ): Promise<ClientEntity> {
    return this.clientsService.update(id as ClientId, updateClientDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    return this.clientsService.remove(id as ClientId);
  }
}