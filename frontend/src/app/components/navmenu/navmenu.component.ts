import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [],
  templateUrl: './navmenu.component.html',
})
export class NavmenuComponent implements OnInit {
  public userName: string;

  constructor(private authService: AuthService) {
    this.userName = '';
  }

  ngOnInit(): void {
    this.userName = this.authService.currentUserValue.user.name;
  }

  handleLogOff() {
    this.authService.signOut();
  }
}
