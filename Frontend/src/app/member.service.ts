import { Injectable } from '@angular/core';
import { Member } from './member/member1';
import { MEMBERS } from './My-members';
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap,catchError,map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private membersurl='http://localhost:3000/users'
  httpOptions={headers:new HttpHeaders({'Content-type':'application/json'})}
  constructor(private messageService:MessageService , private http:HttpClient) { }
  getMember():Observable<Member[]>{
    
    //  this.messageService.add("Members are displayed....")
     return this.http.get<Member[]>(this.membersurl).pipe(
      tap(_=>this.log('fetched members..')),
     catchError(this.handleError<Member[]>('getMember',[]))
    );;
  }
  getMem(id:number):Observable<Member>{
    const url=`${this.membersurl}/${id}`;
    this.messageService.add(`member displayed is ${id}`);
    return this.http.get<Member>(url).pipe(
      tap(_=>this.log(`fetched member detail whose id=${id}...`)),
      catchError(this.handleError<Member>(`getMem id=${id}`))
    );
  }
  updateMember(member: Member): Observable<any> {
    const url=`${this.membersurl}/${member.member_id}`;
    return this.http.put(url, member, this.httpOptions).pipe(
      tap(_=>this.log(`updated member whose id=${member.member_id}`)),
      catchError(this.handleError<any>('updateMember'))
    );;
  }
  addMember(member:Member):Observable<Member>{
    console.log(member);
    return this.http.post<Member>(this.membersurl,member,this.httpOptions).pipe(
      tap((newmember:Member)=>this.log(`New member added with id=${newmember.member_id}`)),
      catchError(this.handleError<Member>('addchar'))
    );

  }
  deleteMember(id:number):Observable<Member>{
    const url=`${this.membersurl}/${id}`;
    return this.http.delete<Member>(url,this.httpOptions).pipe(
      tap(_=>this.log(`deleted member whose id=${id}`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }
  search(term:string):Observable<Member[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Member[]>(`${this.membersurl}/search?term=${term}`).pipe(
      tap(_=>this.log(`searching data for ${term}`)),
      catchError(this.handleError<any>('searchdata',[]))
    );
  }
  private handleError<T>(operation='operation', result?:T){
    return (error:any):Observable<T>=>{
     this.log(`${operation} failed: ${error.message}`)
     console.log(error);
      return of(result as T)
    }
 }
 private log(message:string){
   this.messageService.add(`${message}`);
 }
}
