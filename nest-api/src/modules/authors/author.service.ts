import { Injectable } from '@nestjs/common';
import { CreateAuthorModel, UpdateAuthorModel } from './author.model';
import { AuthorRepository } from './author.repository';
import { AuthorEntity } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(): Promise<AuthorEntity[]> {
    return this.authorRepository.getAllAuthors();
  }

  public async getAuthorById(id: string): Promise<AuthorEntity | undefined> {
    return this.authorRepository.getAuthorById(id);
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorEntity> {
    return this.authorRepository.createAuthor(author);
  }

  public async updateAuthor(id: string, data: UpdateAuthorModel): Promise<AuthorEntity | undefined> {
    return this.authorRepository.updateAuthor(id, data);
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }
}