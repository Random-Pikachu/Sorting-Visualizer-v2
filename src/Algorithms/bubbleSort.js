export const bubbleSort = array =>{
    const animations = [];
    if (array.length<=1) return array;

    for(let i = 0; i<array.length-1; i++){
        for (let j = 0; j<array.length-i-1; j++ ){

            animations.push([j, j+1, 'compare']);

            if(array[j]>array[j+1]){
                //swap elements
                animations.push([j, array[j+1], 'swap']);
                animations.push([j+1, array[j], 'swap']);
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
            

            //reset the color after comparision
            animations.push([j, j+1, 'restore']);
        }
    }

    return animations;

}