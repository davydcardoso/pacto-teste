import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navmenu.component.html',
})
export class NavmenuComponent implements OnInit {
  public userName: string;
  public accessLevel: string;

  constructor(private authService: AuthService) {
    this.userName = '';
    this.accessLevel = '';
  }

  ngOnInit(): void {
    this.userName = this.authService.currentUserValue.user.name;
    this.accessLevel = this.authService.currentUserValue.user.role;
  }

  handleLogOff() {
    this.authService.signOut();
  }
}
