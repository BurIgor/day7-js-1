function lrucache(size) {
	let cache = []; // array of cache values

	// set the capacity of the array
	let capacity = !isNaN(parseFloat(size)) && isFinite(size) ? size : 10;
	let index = 0, border = 0, maxAge = 0;

	return {
		add: function (value) {
			if (value !== undefined && value !== null) {
				// checking if the value is cached
				let object = cache.find(function(elem) {
					return elem.content === value;
				});

				// if the value is not cached, add it to the array
				if (object === undefined) {
					let object = {content: value, aging: 0};
					cache.push(object);
					border = cache.length;
				} else {
					// otherwise reset its query counter
					border = object.aging;
					index = cache.indexOf(object);
					cache[index].aging = 0;
				}

				// we increase the query counter for all elements of the array 
				// for which the counter value is less than the old value 
				// of the counter of the requested element
				for (var i = 0; i < cache.length; i++){
					if (cache[i].aging < border) cache[i].aging++;
				}

				// if the cache capacity is exceeded, delete the item 
				// whose query is the oldest
				if (cache.length > capacity) {
					maxAge = 0;
					for (var i = 0; i < cache.length; i++)
						maxAge = maxAge > cache[i].aging ? maxAge : cache[i].aging;					
					object = cache.find(function(elem) {
						return elem.aging == maxAge;
					});
					index = cache.indexOf(object);
					cache.splice(index, 1);
				}
			}
			return cache;
		},
		clear: function () {
			cache = [];
		}
	}
}