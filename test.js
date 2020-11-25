
function deepCopyBFS(source){
	let stack = [];
	let map = new Map(); // 记录出现过的对象，用于处理环
	let target = getEmpty(source);
	if(target !== source){
		stack.push([source, target]);
		map.set(source, target);
	}
	while(stack.length){
		let [src, tar] = stack.shift();
		for(let key in src){
			// 处理环状
			if(map.get(src[key])){
				tar[key] = map.get(src[key]);
				continue;
			}
			tar[key] = getEmpty(src[key]);
			if(tar[key] !== src[key]){
				stack.push([src[key], tar[key]]);
				map.set(src[key], tar[key]);
			}
		}
	}

	return target;
}