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
    const currArtist = this.checkArtist(id);
    return currArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const currArtist = this.checkArtist(id);
    const elemIndex = this.artists.findIndex((i) => i.id === id);

    this.artists[elemIndex] = {
      ...this.artists[elemIndex],
      ...updateArtistDto,
    };

    return this.artists[elemIndex];
  }

  remove(id: string) {
    const currArtist = this.checkArtist(id);
    this.artists = this.artists.filter((i) => i.id !== id);
  }

  checkArtist(id: string) {
    const currArtist = this.artists.find((i) => i.id === id);
    if (!currArtist) {
      throw new NotFoundException('Artist not found');
    }
    return currArtist;
  }
}
