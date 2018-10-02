const {Observable, Subject, ReplaySubject, from, of, range} = rxjs;
const {map, filter, scan, tap, takeLast} = rxjs.operators;

console.dir(rxjs);

console.dir(rxjs.operators);

console.dir(rxjs.ajax);

const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
const source1$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const source2$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const source3$ = range(1, 10);

range(1, 10)
    .pipe(
        tap(n => console.log(`source = ${n}`)),
        filter(n => n % 2 !== 0),
        map(n => n * n),
        scan((acc,s) => acc + s, 0),
        takeLast(1)
    )
    .subscribe(x => console.log(x));