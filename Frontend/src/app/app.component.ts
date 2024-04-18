import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgFor } from '@angular/common';
import { Observable,debounceTime,distinctUntilChanged,switchMap,Subject } from 'rxjs';
import { Member } from './member/member1';
import { MemberService } from './member.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MemberComponent,MessagesComponent,RouterModule,DashboardComponent,NgFor,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hello! World';
  constructor(private memberservice:MemberService){}
  private searchTerms=new Subject<string>();
  member$!:Observable<Member[]>;
  search(term:string){
    this.searchTerms.next(term);
  }
  ngOnInit(){
    this.member$=this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.memberservice.search(term))
    )
    console.log(this.member$);
  }
}
