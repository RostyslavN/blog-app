import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private possibleStatuses: string[] = ['logging', 'blogging', 'registering'];
  private status: string;
  public statusChange: Subject<string> = new Subject<string>();

  public changeStatus(status: string): void {
    if (!this.possibleStatuses.includes(status)) return console.error('impossible status');
    this.status = status;
    this.statusChange.next(this.status);
    localStorage.setItem('status', status);
  }

  public getStatus(): string {
    this.status = localStorage.getItem('status') || 'logging';
    this.statusChange.next(this.status);
    return this.status;
  }

}
