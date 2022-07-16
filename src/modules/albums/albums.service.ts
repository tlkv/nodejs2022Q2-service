import { Injectable, NotFoundException } from '@nestjs/common';
import { MemoryDb } from 'src/services/db.service';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  private albums = MemoryDb.albums;
  private tracks = MemoryDb.tracks;

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const currAlbum = this.albums.find((i) => i.id === id);
    if (!currAlbum) {
      throw new NotFoundException('Album not found');
    }
    return currAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const currAlbum = this.findOne(id);
    if (!currAlbum) return;
    const elemIndex = this.albums.findIndex((i) => i.id === id);

    this.albums[elemIndex] = {
      ...this.albums[elemIndex],
      ...updateAlbumDto,
    };

    return this.albums[elemIndex];
  }

  remove(id: string) {
    const currAlbum = this.findOne(id);
    if (!currAlbum) return;
    this.albums = this.albums.filter((i) => i.id !== id);
    this.tracks.forEach((i) => {
      if (i.albumId === id) {
        i.albumId = null;
      }
    });
  }
}
