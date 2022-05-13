import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { getID, getName } from './utils';

const ceil = Math.ceil;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('itemsElement', { static: true }) itemsElement!: ElementRef;
  items: Array<{name: string, id: number}> = [];
  observer: any;
  controlParameters!: { offsetWidth: number, scrollWidth: number, scrollLeft: number };
  controlButtonsDisable: { left: boolean, right: boolean } = { left: true, right: true };
  indicatorButtons: any[] = [];
  activeIndicator: number = 0;

  ngOnInit() {
    this.generateItems();
    this.initializeObserver();
  }

  initializeObserver() {
    this.observer = new ResizeObserver(() => {
      this.generateControls();
      this.checkControlButtons();
    });

    this.generateControls();
    this.checkControlButtons();
    this.observer.observe(this.itemsElement.nativeElement);
  }

  generateItems() {
    for (let i = 0; i < 50; i++) {
      this.items.push({
        name: getName(),
        id: getID()
      });
    }
  }

  checkControlButtons() {
    const { offsetWidth, scrollWidth, scrollLeft } = this.controlParameters;
    this.controlButtonsDisable = {
      left: scrollLeft <= 10,
      right: (scrollWidth - scrollLeft) <= (offsetWidth + 10)
    };
  }

  generateControls() {
    const { offsetWidth, scrollWidth, scrollLeft } = this.itemsElement.nativeElement;
    this.controlParameters = { offsetWidth, scrollWidth, scrollLeft };
    const limit = ceil(scrollWidth / offsetWidth);

    this.indicatorButtons = [];
    for (let i = 0; i < limit; i++) {
      this.indicatorButtons.push({
        active: i === this.activeIndicator,
        index: i,
        scrollLeft: i * offsetWidth
      });
    }
    setTimeout(() => {
      this.indicatorButtons = [...this.indicatorButtons];
    });
  }

  syncIndicators(handleDirection = false, direction?: string) {
    if (handleDirection) {
      this.activeIndicator += direction === 'left' ? -1 : 1;
    }
    this.indicatorButtons = this.indicatorButtons.map((indicator) => {
      indicator.active = false;
      indicator.active = indicator.index === this.activeIndicator;
      return indicator;
    });
    this.checkControlButtons();
  }

  onHandleControl(direction: string, limit = 100) {
    limit = this.controlParameters.offsetWidth;
    this.controlParameters.scrollLeft +=((direction === 'left' ? -1 : 1) * limit);
    this.itemsElement.nativeElement.scrollLeft = this.controlParameters.scrollLeft;

    this.syncIndicators(true, direction);
  }

  handleIndicator(indicator: any) {
    this.activeIndicator = indicator.index;
    this.controlParameters.scrollLeft = indicator.scrollLeft;
    this.itemsElement.nativeElement.scrollLeft = this.controlParameters.scrollLeft;
    this.syncIndicators();
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.itemsElement.nativeElement);
  }
}
