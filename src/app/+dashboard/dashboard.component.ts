import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  path = '/dashboard';


  routes: Route[] = [
    {
      path: `${this.path}/torrents`,
      text: 'Torrents',
      icon: 'fas fa-link'
    }
  ];
  activeRoute: Route;

  constructor(public router: Router) {
  }

  selectRoute(route: Route) {
    this.activeRoute = route;
  }

  getOut() {
    this.router.navigate(['/']);
  }

}

interface Route {
  path: string;
  text: string;
  icon: string;
}
