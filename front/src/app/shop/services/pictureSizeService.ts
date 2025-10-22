import { HostListener, Injectable, OnDestroy } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
    providedIn: 'root'
})
export class pictureSizeService implements OnDestroy{
    private screenSizeSubject$ = new BehaviorSubject<number>(window.innerWidth);
    screenSize$ = this.screenSizeSubject$.asObservable();
    private resizeSub = new Subscription();
    images: string[] = [];

    constructor() {
        this.resizeSub = fromEvent(window, 'resize').subscribe(() => {
            this.screenSizeSubject$.next(window.innerWidth);
          });
    }

    currentImageFromTab(index: number): string {
        const picture = this.images[index];
        return this.calculateSize(picture)
    }

    currentStaticImage(): string {
        return this.calculateSize(this.images[0]);
    }

    private calculateSize(name: string): string {
        const size = this.screenSizeSubject$.value;

        const base = name.replace("-1920px.jpeg", "");

        if (size >= 950) {
            return name;
        }
        else if (size < 950 && size >= 450) {
            return `${base}-800px.jpeg`;
        }
        else {
            return `${base}-450px.jpeg`;
        }
    }

    setImagesTab(img: string[]) {
        this.images = img;
    }

    ngOnDestroy(): void {
        this.resizeSub.unsubscribe();
    }
}