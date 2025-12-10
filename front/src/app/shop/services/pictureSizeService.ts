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

    /**
     * This function allow to get the adapted picture from pictures tab
     * @param index 
     * @returns a string of the target picture
     */
    currentImageFromTab(index: number): string {
        const picture = this.images[index];
        return this.calculateSize(picture)
    }

    /**
     * This function allow to get the current static picture
     * @returns the target string picture
     */
    currentStaticImage(): string {
        return this.calculateSize(this.images[0]);
    }

    /**
     * This function allow to calculate picture size for responsiveness
     * @param name 
     * @returns the target picture 
     */
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

    /**
     * This function allow to set the tab of pictures
     * @param img 
     */
    setImagesTab(img: string[]) {
        this.images = img;
    }

    ngOnDestroy(): void {
        this.resizeSub.unsubscribe();
    }
}