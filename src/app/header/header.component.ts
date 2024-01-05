import { Component } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = 'Apartahotel Santandereano'
 


  ngOnInit() {

  this.navigation();
  this.toggle();

  }


  navigation(): void {
    let list: NodeListOf<Element> = document.querySelectorAll(".navigation li");

    function activeLink(this: Element) {
      list.forEach(item => {
        item.classList.remove("hovered");
      })

      this.classList.add("hovered");
    }

    list.forEach(item => item.addEventListener("mouseover", activeLink));
  }

  toggle(): void {

    let toggle: HTMLElement | null = document.querySelector(".toggle");
    let navigation: HTMLElement | null = document.querySelector(".navigation");
    let main: HTMLElement | null = document.querySelector(".main");

    toggle?.addEventListener("click", function () {
      navigation?.classList.toggle("active");
      main?.classList.toggle("active");
    });
  }

}



