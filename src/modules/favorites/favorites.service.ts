import { Injectable } from '@nestjs/common';
import { MemoryDb } from 'src/services/db.service';

@Injectable()
export class FavoritesService {
  private favorites = MemoryDb.favorites;

  findAll() {
    return this.favorites;
  }

  createTrack(id: string) {
    return `createTrack`;
  }

  removeTrack(id: string) {
    return `removeTrack`;
  }

  createArtist(id: string) {
    return `createArtist`;
  }

  removeArtist(id: string) {
    return `removeArtist`;
  }

  createAlbum(id: string) {
    return `createAlbum`;
  }

  removeAlbum(id: string) {
    return `removeAlbum`;
  }
}
