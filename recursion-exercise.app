/*
Using iteration, write a function fibs which takes a number and returns
an array containing that many numbers from the fibonacci sequence.
Using an example input of 8, this method should return the array
[0, 1, 1, 2, 3, 5, 8, 13].
*/



function fibs (n){
    const arr = [0, 1];
    let i = 2;
    while(i < n){
        arr.push(arr[i - 2] + arr[i - 1]);
        i++;
    }
    return arr.slice(0, n);
}

console.log(fibs(8));




/*
Now write another method fibsRec which solves the same problem recursively.
This can be done in just a couple of lines (or 1 if you’re crazy,
but don’t consider either of these lengths a requirement… just get it done).
*/


function fibsRec(n, arr = [0, 1]){
    if(arr.length >= n){
        return arr.slice(0, n);
    } else {
        arr.push(arr[arr.length - 1] + arr[arr.length - 2])
        return fibsRec(n, arr);
    }
}

console.log(fibsRec(8));
