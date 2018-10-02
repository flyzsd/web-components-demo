const {Observable, Subject, ReplaySubject, from, of, range, throwError} = rxjs;
const {map, filter, scan, tap, takeLast, delay, catchError, finalize} = rxjs.operators;

const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// console.log('start');
// source$.pipe(
//     tap(n => console.log(`source = ${n}`)),
//     filter(n => n % 2 !== 0),
//     map(n => n * n)
// )
//     .subscribe(
//         value => console.log(value),
//         err => console.log(err),
//         () => console.log('complete')
//     );
// console.log('end');

// console.log('start');
// source$.pipe(
//         tap(n => console.log(`source = ${n}`)),
//         delay(1000),
//         filter(n => n % 2 !== 0),
//         map(n => n * n)
//     )
//     .subscribe(
//         value => console.log(value),
//         err => console.log(err),
//         () => console.log('complete')
//     );
// console.log('end');

// console.log('start');
// source$.pipe(
//     tap(n => console.log(`source = ${n}`)),
//     filter(n => n % 2 !== 0),
//     tap(n => {
//         if (n === 5) {
//             throw new Error('Hello world');
//         }
//     }),
//     map(n => n * n)
// )
//     .subscribe(
//         value => console.log(value),
//         err => {
//             console.log('error callback');
//             console.log(err);
//         },
//         () => console.log('complete')
//     );
// console.log('end');

// console.log('start');
// source$.pipe(
//     tap(n => console.log(`source = ${n}`)),
//     delay(1000),
//     filter(n => n % 2 !== 0),
//     tap(n => {
//         if (n === 5) {
//             throw new Error('Hello world');
//         }
//     }),
//     map(n => n * n)
// )
//     .subscribe(
//         value => console.log(value),
//         err => {
//             console.log('error callback');
//             console.log(err);
//         },
//         () => console.log('complete')
//     );
// console.log('end');

// console.log('start');
// source$.pipe(
//     tap(n => console.log(`source = ${n}`)),
//     delay(1000),
//     filter(n => n % 2 !== 0),
//     tap(n => {
//         if (n === 5) {
//             throw new Error('Hello world');
//         }
//     }),
//     map(n => n * n),
//     catchError((err) => {
//         return of(0);
//     })
// )
//     .subscribe(
//         value => console.log(value),
//         err => {
//             console.log('error callback');
//             console.log(err);
//         },
//         () => console.log('complete')
//     );
// console.log('end');

// console.log('start');
// source$.pipe(
//     tap(n => console.log(`source = ${n}`)),
//     delay(1000),
//     filter(n => n % 2 !== 0),
//     tap(n => {
//         if (n === 5) {
//             throw new Error('Hello world');
//         }
//     }),
//     map(n => n * n),
//     catchError((err) => {
//         console.log(err);
//         // return throwError(err);
//         return throwError(new Error('another error'));
//     })
// )
//     .subscribe(
//         value => console.log(value),
//         err => {
//             console.log('error callback');
//             console.log(err);
//         },
//         () => console.log('complete')
//     );
// console.log('end');

console.log('start');
source$.pipe(
    tap(n => console.log(`source = ${n}`)),
    delay(1000),
    filter(n => n % 2 !== 0),
    tap(n => {
        if (n === 5) {
            throw new Error('Hello world');
        }
    }),
    map(n => n * n),
    catchError((err) => {
        console.log(err);
        // return throwError(err);
        return throwError(new Error('another error'));
    }),
    finalize(() => console.log('called no matter success or error'))
)
    .subscribe(
        value => console.log(value),
        err => {
            console.log('error callback');
            console.log(err);
        },
        () => console.log('complete')
    );
console.log('end');