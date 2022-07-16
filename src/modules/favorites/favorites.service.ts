import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MemoryDb } from 'src/services/db.service';

@Injectable()
export class FavoritesService {
  findAll() {
    return MemoryDb.favorites;
  }

  createTrack(id: string) {
    const currTrack = MemoryDb.tracks.find((i) => i.id === id);
    const currTrackFavs = MemoryDb.favorites.tracks.find((i) => i.id === id);
    if (!currTrack || currTrackFavs) {
      throw new UnprocessableEntityException();
    }
    MemoryDb.favorites.tracks.push(currTrack);
  }

  removeTrack(id: string) {
    const currTrack = MemoryDb.favorites.tracks.find((i) => i.id === id);
    if (!currTrack) {
      throw new NotFoundException();
    }
    const upd = MemoryDb.favorites.tracks.filter((i) => i.id !== id);
    MemoryDb.favorites.tracks = upd;
  }

  createArtist(id: string) {
    const currArtist = MemoryDb.artists.find((i) => i.id === id);
    if (!currArtist) {
      throw new UnprocessableEntityException();
    }
    MemoryDb.favorites.artists.push(currArtist);
  }

  removeArtist(id: string) {
    const currArtist = MemoryDb.favorites.artists.find((i) => i.id === id);
    if (!currArtist) {
      throw new NotFoundException();
    }
    MemoryDb.favorites.artists = MemoryDb.favorites.artists.filter(
      (i) => i.id !== id,
    );
  }

  createAlbum(id: string) {
    const currAlbum = MemoryDb.albums.find((i) => i.id === id);
    if (!currAlbum) {
      throw new UnprocessableEntityException();
    }
    MemoryDb.favorites.albums.push(currAlbum);
  }

  removeAlbum(id: string) {
    const currAlbum = MemoryDb.favorites.albums.find((i) => i.id === id);
    if (!currAlbum) {
      throw new NotFoundException();
    }
    console.log('removeAlbum', MemoryDb.favorites.albums);
    MemoryDb.favorites.albums = MemoryDb.favorites.albums.filter(
      (i) => i.id !== id,
    );
    console.log('removeAlbum', MemoryDb.favorites.albums);
  }
}
