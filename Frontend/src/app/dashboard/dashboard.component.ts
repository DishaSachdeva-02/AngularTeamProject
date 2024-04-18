import { Component } from '@angular/core';
import { Member } from '../member/member1';
import { NgFor } from '@angular/common';
import { MemberService } from '../member.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   members:Member[]=[];
   constructor(private memberservice:MemberService){}
   ngOnInit(){
     this.getMembers();
   }
   getMembers(){
      this.memberservice.getMember().subscribe(member=>this.members=member);
   }
}
