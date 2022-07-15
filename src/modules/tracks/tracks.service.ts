import { Injectable, NotFoundException } from '@nestjs/common';
import { MemoryDb } from 'src/services/db.service';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks = MemoryDb.tracks;

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: v4(),
      name: createTrackDto.name,
      albumId: createTrackDto.albumId,
      artistId: createTrackDto.artistId,
      duration: createTrackDto.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const currTrack = this.tracks.find((i) => i.id === id);
    if (!currTrack) {
      throw new NotFoundException('Track not found');
    }
    return currTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const currTrack = this.findOne(id);
    if (!currTrack) return;
    const elemIndex = this.tracks.findIndex((i) => i.id === id);
    console.log(elemIndex);

    this.tracks[elemIndex] = {
      ...this.tracks[elemIndex],
      ...updateTrackDto,
    };

    return this.tracks[elemIndex];
  }

  remove(id: string) {
    const currTrack = this.findOne(id);
    if (!currTrack) return;
    this.tracks = this.tracks.filter((i) => i.id !== id);
  }
}
