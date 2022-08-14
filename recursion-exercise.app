

function fibs (n){
    const arr = [0, 1];
    let i = 2;
    while(i < n){
        arr.push(arr[i - 2] + arr[i - 1]);
        i++;
    }
    return arr.slice(0, n);
}

//console.log(fibs(8));


function fibsRec(n, arr = [0, 1]){
    if(arr.length >= n){
        return arr.slice(0, n);
    } else {
        arr.push(arr[arr.length - 1] + arr[arr.length - 2])
        return fibsRec(n, arr);
    }
}

//console.log(fibsRec(8));


function mergeSort(array){

    const mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid);

    if(1 < left.length){
        left = mergeSort(left);
    }
    if(1 < right.length){
        right = mergeSort(right);
    }

    const merged = [];

    while(left.length || right.length){
        if(left.length && right.length && left[0] <= right[0]){
            merged.push(left.shift());
        } else {
            merged.push(right.shift());
        }

        if(left.length && !right.length){
            merged.push(left.shift());
        }

        if(!left.length && right.length){
            merged.push(right.shift());
        }
    }
    return merged;
}

//console.log(mergeSort([8,2,4,3,6,7,2,3,28,9,9, 5]));