import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { faCoffee, faEllipsis, faSearch,faPaperPlane, faPhone, faCamera, faUserPlus, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
})
export class Chat {


  faStar = faStar
faUserPlus = faUserPlus
 faCamera = faCamera
  faPhone = faPhone
faPaperPlane = faPaperPlane
  faSearch = faSearch
  faEllipsis = faEllipsis;
  username = '';
  room = '';
  message = '';
  messages: { username: string, message: string }[] = [];
  joined = false;
users: { username: string, online: boolean }[] = [];

  constructor(
    private chatService: ChatService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone // <-- injetar NgZone
  ) {}

ngOnChange(){
  console.log(this.messages)
  this.chatService.listMessages().subscribe((msg: any) => {
      // Garantir que Angular detecte a mudança
      this.ngZone.run(() => {
        this.messages.push(msg);
        this.cd.detectChanges();
      });
    });
}

ngOnInit() {
  this.chatService.getUsersInRoom().subscribe((users: any) => {
    this.users = users;
    console.log(users)
    this.cd.detectChanges();
  });
}
getUserStatus(username: string): boolean {
  const user = this.users.find(u => u.username === username);
  return user ? user.online : false;
}


  joinRoom() {
    if (!this.username || !this.room) return;

    this.chatService.joinRoom(this.username, this.room);
    this.joined = true;

    this.listenMessages(); // começar a escutar mensagens
  }

  sendMessage() {
    if (!this.message.trim()) return;

    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  private listenMessages() {
    this.chatService.listMessages().subscribe((msg: any) => {
      // Garantir que Angular detecte a mudança
      this.ngZone.run(() => {
        this.messages.push(msg);
        this.cd.detectChanges();
      });
    });
  }
  }
