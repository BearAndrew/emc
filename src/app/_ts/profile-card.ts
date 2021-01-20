import { colorList } from './color';

export interface ProfileCard {
  // cardOrder: number;
  // photo: img;
  cardColor: string;
  name:  string;
  age: number;
  gender: string;
  birthday: Date;
  location: string; // 地點
  constellation: string; // 星座
  job: string;
  department: string; // 科系
  noteList: Array<
  {
    keywords: Array<Ikeyword>,
    content: string;
  }>;
  comment: string;
  remark: string;
  // chekcList: {
  // };
}


interface Ikeyword {
  name: string | null;
  class: string | null;
}

export class ProfileCard implements ProfileCard {
  cardColor = colorList[0];
  name = 'no name';
  gender = '';
  location = ''; // 地點
  constellation = ''; // 星座
  job = '';
  department = ''; // 科系
  noteList = [
    {keywords: [] as Array<Ikeyword>, content: ''},
    {keywords: [] as Array<Ikeyword>, content: ''},
    {keywords: [] as Array<Ikeyword>, content: ''},
    {keywords: [] as Array<Ikeyword>, content: ''},
    {keywords: [] as Array<Ikeyword>, content: ''},
  ];
  comment = '';
  remark = '';
}

export const noteListName = [
  '筆記', '親情', '友情', '愛情', '工作'
];
// '筆記', '親情', '友情', '愛情', '工作'


    // this.pCard = {
    //   name: '熊庭緯',
    //   age: 25,
    //   gender: '男',
    //   constellation: '獅子座',
    //   location: '台北市',
    //   job: '工程師',
    //   department: '資工系',
    //   noteList: [
    //     {
    //       keywords: [{name: '游泳', class: 'blue'}],
    //       content: '運動'
    //     },
    //     {
    //       keywords: [{name: '親情', class: 'blue'}],
    //       content: '親情內容'
    //     },
    //     {
    //       keywords: [{name: '友情', class: 'blue'}],
    //       content: '友情內容'
    //     },
    //     {
    //       keywords: [{name: '愛情', class: 'blue'}],
    //       content: '愛情內容'
    //     },
    //     {
    //       keywords: [{name: '工作', class: 'blue'}],
    //       content: '工作內容'
    //     }
    //   ]
    // };
