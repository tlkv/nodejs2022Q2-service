import { Injectable, NotFoundException } from '@nestjs/common';
import { MemoryDb } from 'src/services/db.service';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private artists = MemoryDb.artists;

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const currArtist = this.artists.find((i) => i.id === id);
    if (!currArtist) {
      throw new NotFoundException('Artist not found');
    }
    return currArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: string) {
    return `This action removes a #${id} artist`;
  }
}