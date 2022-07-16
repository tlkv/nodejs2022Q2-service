import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MemoryDb } from 'src/services/db.service';

@Injectable()
export class FavoritesService {
  /* private favorites = MemoryDb.favorites;
  private tracks = MemoryDb.tracks;
  private artists = MemoryDb.artists;
  private albums = MemoryDb.albums; */

  findAll() {
    return MemoryDb.favorites;
  }

  createTrack(id: string) {
    const currTrack = MemoryDb.tracks.find((i) => i.id === id);
    const currTrackFavs = MemoryDb.favorites.tracks.find((i) => i.id === id);
    if (!currTrack || currTrackFavs) {
      throw new UnprocessableEntityException(); //422
    }
    MemoryDb.favorites.tracks.push(currTrack);
  }

  removeTrack(id: string) {
    const currTrack = MemoryDb.favorites.tracks.find((i) => i.id === id);
    if (!currTrack) {
      throw new NotFoundException(); //404
    }
    MemoryDb.favorites.tracks = MemoryDb.favorites.tracks.filter(
      (i) => i.id !== id,
    );
  }

  createArtist(id: string) {
    const currArtist = MemoryDb.artists.find((i) => i.id === id);
    if (!currArtist) {
      throw new UnprocessableEntityException(); //422
    }
    MemoryDb.favorites.artists.push(currArtist);
  }

  removeArtist(id: string) {
    const currArtist = MemoryDb.favorites.artists.find((i) => i.id === id);
    if (!currArtist) {
      throw new NotFoundException(); //404
    }
    MemoryDb.favorites.artists = MemoryDb.favorites.artists.filter(
      (i) => i.id !== id,
    );
  }

  createAlbum(id: string) {
    const currAlbum = MemoryDb.albums.find((i) => i.id === id);
    if (!currAlbum) {
      throw new UnprocessableEntityException(); //422
    }
    MemoryDb.favorites.albums.push(currAlbum);
    // return `createAlbum`;
  }

  removeAlbum(id: string) {
    const currAlbum = MemoryDb.favorites.albums.find((i) => i.id === id);
    if (!currAlbum) {
      throw new NotFoundException(); //404
    }
    MemoryDb.favorites.albums = MemoryDb.favorites.albums.filter(
      (i) => i.id !== id,
    );
    // return `removeAlbum`; //404
  }
}
