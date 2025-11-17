import { Status, Format } from "./enums";

export class Book {
    title: string;
    author: string;
    numberOfPages: number;
    status: Status;
    price: number;
    pagesRead: number;
    format: Format;
    suggestedBy: string;
    finished: boolean;

    constructor(
        title: string,
        author: string,
        numberOfPages: number,
        status: Status,
        price: number,
        pagesRead: number,
        format: Format,
        suggestedBy: string,
    ) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = pagesRead >= numberOfPages;
    }

    currentlyAt(): string {
        return `${this.pagesRead} / ${this.numberOfPages}`;
    }

    deleteBook(): void {

    }

    getReadingPercentage(): number {
        return Math.floor((this.pagesRead / this.numberOfPages) * 100);
    }
}
