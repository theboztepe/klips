import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IClip from '../models/clips.model';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  public clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.clipsCollection = this.db.collection('clips');
  }

  createClip(clip: IClip) {
    return this.clipsCollection.add(clip);
  }
}
