import { Controller, Get, Post, Body } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleEntity } from './entities/sale.entity';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  public async create(@Body() createSaleDto: CreateSaleDto): Promise<SaleEntity> {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  public async findAll(): Promise<SaleEntity[]> {
    return this.salesService.findAll();
  }
}