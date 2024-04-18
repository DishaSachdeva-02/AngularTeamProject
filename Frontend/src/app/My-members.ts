import { Member } from "./member/member1";
export const MEMBERS: Member[]=[
    {member_id:1 ,  name:'Disha'},
    {member_id:2 ,  name:'Nitanshi'},
    {member_id:3 ,  name:'Vansh'},
    {member_id:4 ,  name:'Ankit'}
];
// const maxMemberId = await Member.findOne({}, {}, { sort: { 'member_id': -1 } });
//     const newMemberId = maxMemberId ? maxMemberId.member_id + 1 : 1;