import { Component,Input } from '@angular/core';
import { NgFor,UpperCasePipe,NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Member } from '../member/member1';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,UpperCasePipe],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent {
  mymember?:Member
  constructor(private memberservice:MemberService , private locationservice:Location , private activatedroute :ActivatedRoute){}
  ngOnInit():void{
    this.getMember();
  }
  getMember(){
    const id=Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.memberservice.getMem(id).subscribe(mem=>this.mymember=mem);

  }
  goback(){
    this.locationservice.back();
  }
  save(): void {
    if (this.mymember) {
      this.memberservice
        .updateMember(this.mymember)
        .subscribe(() => this.goback());
    }
  }
}
