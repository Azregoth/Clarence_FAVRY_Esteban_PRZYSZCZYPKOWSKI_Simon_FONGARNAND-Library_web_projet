import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async create(dto: CreateSaleDto): Promise<SaleEntity> {
    const sale: SaleEntity = this.saleRepository.create(dto);
    return this.saleRepository.save(sale);
  }

  public async findAll(): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      relations: { client: true, book: true },
    });
  }

  public async remove(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }
}