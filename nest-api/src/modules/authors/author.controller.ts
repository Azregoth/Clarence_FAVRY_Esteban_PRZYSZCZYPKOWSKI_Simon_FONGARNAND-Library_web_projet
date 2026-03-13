import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Get(':id')
  getAuthorById(@Param('id') id: string) {
    return this.authorService.getAuthorById(id);
  }

  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Patch(':id')
  public async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: Partial<CreateAuthorDto>,
  ) {
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  public async deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }
}