import {Pagination} from 'nestjs-typeorm-paginate';

export class Page<T>{

    content: T[];

    totalPages: number;

    totalElements: number;

    size: number;

    number: number;

    numberOfElements: number;

    first: boolean;

    last: boolean;

    static createFromPagination<T>(pagination: Pagination<T>){
        const {items, meta} = pagination;

        const p = new Page<T>();

        p.content = items;
        p.totalPages = meta.totalPages;
        p.totalElements = meta.totalItems;
        p.size = meta.itemsPerPage;
        p.number = meta.currentPage;
        p.numberOfElements = meta.itemCount;
        p.first = p.number === 1;
        p.last = p.number === p.totalPages;

        return p;
    }
}
