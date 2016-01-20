# Running Burrow-Monitor

---

**Start Kafka Server**
  
> zookeeper ->
    $zookeeper_path/bin/zkServer.sh start

> kafka ->
	$kafka_path/bin/kafka-server-start.sh config/server.properties

---

**Start Burrow**
    
> $GOPATH/bin/burrow --config path/to/burrow.cfg

---

**Start Burrow-Monitor**
    
> Start httpserver at $burrow-monitor-path.
    
> If accessing from same machine, ensure "Cross Origin Resource.." error is avoided.