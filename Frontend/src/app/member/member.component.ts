import { Component } from '@angular/core';
import { Member } from './member1';
import { FormsModule } from '@angular/forms';
import { MEMBERS } from '../My-members';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { MemberDetailsComponent } from '../member-details/member-details.component';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-member',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf,MemberDetailsComponent,RouterModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {
  member:Member[]=[];
  constructor(private memberservice:MemberService,private messageService:MessageService){}
  ngOnInit():void{
    this.getMembers();
  }
  getMembers():void{
    this.memberservice.getMember().subscribe(members=>this.member=members);
  }
  add(name:string){
    name = name.trim();
    if(!name){
      return 
    }

    this.memberservice.addMember({name} as Member).subscribe(m=>this.member.push(m));
  }
  delete(member: Member): void{
    this.member = this.member.filter(m => m!= member);
    this.memberservice.deleteMember(member.member_id).subscribe();
  }
}
