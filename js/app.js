angular.module("monitorApp", [])

.controller('mainController', function($http, $interval){
	var vm = this;

	vm.topMessage = "Current groups in Kafka";
	vm.groupArray = [];
	vm.getConsumerData = getConsumerData;
	vm.pollrate = 5;
	vm.setVal = setVal;
	var burrowHost = "192.168.104.64";

	fetch();
	// vm.getConsumerTopics = getConsumerTopics;

	var p = $interval(getConsumerData, 1000*vm.pollrate);
	var q = $interval(fetch, 1000*20);

	function setVal() {
		$interval.cancel(p);
		p = $interval(getConsumerData, 1000*vm.pollrate);
	}

	function fetch(){
		vm.groupArray = [];
		$http.get("http://" + burrowHost + ":8000/v2/kafka/local/consumer").success(
			function(res){
				console.log(res.consumers);
				vm.groups = res;

				for(i in vm.groups.consumers) {							
					console.log(i);
					getGroupStatus(vm.groups.consumers[i]);
				}
			}
		);
	};

	function getGroupDetails(groupName, groupStatus) {
		$http.get("http://" + burrowHost + ":8000/v2/kafka/local/consumer/"
		+ groupName + "/topic").success(function(res) {
			var groupData = {
				groupName : groupName,
				groupTopic : res,
				groupStatus: groupStatus
			}
			vm.groupArray.push(groupData);
			console.log(groupData);
		});
	};

	function getGroupStatus(groupName) {
		$http.get("http://" + burrowHost + ":8000/v2/kafka/local/consumer/"
			+ groupName + "/status").success(
				function(res) {
					console.log("groupStatus");
					console.log(res.status.status);
					getGroupDetails(groupName, res.status.status);
				}
			);
	};

	function getConsumerData(groupName, topicName){
		console.log("haha " + topicName + vm.pollrate);
		
			if(topicName == undefined) {
				if(vm.consumerName == undefined)
					return;
				groupName = vm.consumerName;
				topicName = vm.currentConsumerTopic;
			}
			$http.get("http://" + burrowHost + ":8000/v2/kafka/local/consumer/"
			+ groupName + "/topic/" + topicName).success(
				function(res) {
					console.log(res.offsets);
					vm.consumerName = groupName;
					vm.currentConsumerTopic = topicName;
					vm.consumerData = res;
				}	
			);

			$http.get("http://" + burrowHost + ":8000/v2/kafka/local/consumer/"
			+ groupName + "/status").success(
				function(res) {
					vm.consumerStatus = res;
				}	
			);
	};
});