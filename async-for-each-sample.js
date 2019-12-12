    /*
    *  simple implementation of Async forEach using async-await
    * */
   
    let domain = 'https://api.myjson.com/bins/';
    let urls = ['y56yk', 'ln398', 'qzzp8'];

    /*
    *  simple for loop , just like polyfill for forEach
    *  for detail check : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill
    * */
    const asyncForEach = async function (array, callback) {
        for (let index = 0, length = array.length; index < length; index++) {
            await callback(array[index], index, array);
        }
    }

    /*
    *  custom forEach loop with Async implementation using our custom asyncForEach(polyfill of forEach)
    * */
    const asyncEach = async function (arrays, cb) {
        const result = [];
        await asyncForEach(arrays, async function (item) {
            const executionResult = await cb(item);
            result.push(executionResult);
        });
        return result;
    }

    /*
    *  simple function to perform some async task like calling ajax request
    * */
    let checkForStudy = async function (item) {
        return fetch(domain + item).then(function (res) {
            return res.json();
        })
    }

    /*
    *  normal function to test our async forEach implementation
    * */
    const testForEachInAsync = async function () {
        console.log(" start ")
        let result = await asyncEach(urls, checkForStudy);
        console.log(" done ", result)
    }

    testForEachInAsync();



