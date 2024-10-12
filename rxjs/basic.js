import {Observable, combineLatest, delay, map, mergeMap, of} from 'rxjs';

// Create an observable that emits a sequence of numbers
const numberObservable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete(); // Signal that the stream is complete
});

// Subscribe to the observable
var test = numberObservable;

 const usingOperators = () => {
  const numberStream = of(1, 2, 3);

  // Use the map operator to transform the values
  const transformedStream = numberStream.pipe(
    map(value => value * 10), // Multiply each value by 10
  );

  // Subscribe to the transformed stream
  transformedStream.subscribe(value =>
    console.log('Transformed value:', value),
  );
};

const usignLates =()=>{
  let stream1,stream2;
  stream1 = of('bannana','apple')
  stream2 = of('yellow','red')
  combineLatest([stream1,stream2]).subscribe(([fruite,color])=>{
    console.log(fruite+" "+ color)
  })
}
const usingApiCall=()=>{
  const apiCall = (id) => {
    return of(`Data for item ${id}`).pipe(delay(2000)); // Delay simulates async behavior
  };
  
  // Observable that emits item IDs
  const itemStream = of(1, 2, 3);
  
  // Use mergeMap to call the API for each item ID
  itemStream.pipe(
    mergeMap(id => apiCall(id))
  ).subscribe(data => console.log('API Response:', data));
}

export default usingApiCall;
