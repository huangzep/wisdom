define(function () {
	var utils = {
		queryString() {
			var temp, info = {}
			var infoArr = location.search.slice(1).split('&')
			for (var i = 0 ; i < infoArr.length; i++) {
				temp = infoArr[i].split('=')
				info[temp[0]] = temp[1]
			}
			return info
		}
	}
	return utils
})