import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  @Input() autoPlay = false;
  @Input() autoPlayInterval = 3000;
  @Input() infinite = true;
  @Input() showIndicators = true;
  @Input() showCounter = true;
  @Input() transitionDuration = 300;

  currentIndex = 0;
  translateX = 0;
  autoPlayTimer: any;

  // Touch/swipe properties
  touchStartX = 0;
  touchCurrentX = 0;
  isSwiping = false;
  swipeThreshold = 50;

  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else if (this.infinite) {
      this.currentIndex = 0;
    }
    this.updateCarousel();
  }

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.infinite) {
      this.currentIndex = this.images.length - 1;
    }
    this.updateCarousel();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  private updateCarousel() {
    this.translateX = -this.currentIndex * 100;

    if (this.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  private startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  // Touch/Swipe handlers
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.isSwiping = true;
    this.stopAutoPlay();
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isSwiping) return;

    this.touchCurrentX = event.touches[0].clientX;
    const diff = this.touchStartX - this.touchCurrentX;

    // Optional: Add visual feedback during swipe
    // this.translateX = (-this.currentIndex * 100) - (diff / window.innerWidth * 100);
  }

  onTouchEnd() {
    if (!this.isSwiping) return;

    const swipeDistance = this.touchStartX - this.touchCurrentX;

    if (Math.abs(swipeDistance) > this.swipeThreshold) {
      if (swipeDistance > 0) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    }

    this.isSwiping = false;

    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  onImageLoad() {
    // Handle image loading if needed
  }
}