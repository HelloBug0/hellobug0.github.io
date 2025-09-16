## 1 TIME_WAIT连接状态可能带来的问题？
之前文章[TIME_WAIT状态](https://hellobug0.github.io/tcp/TIME_WAIT%E7%8A%B6%E6%80%81)中介绍了处于`TIME_WAIT`状态的连接相关内容，由于处于该状态的连接持续时间较长（如果2MSL=60秒），在高并发场景中，可能会有大量连接处于`TIME_WAIT`状态，占用TCP连接的端口号，导致端口号被耗尽（端口号数量限制65535），新的连接无法建立，因此需要采用一些方法回收处于 `TIME_WAIT` 状态的连接。

## 2 如何回收处于TIME_WAIT状态的连接？
### 2.1 tcp_tw_reuse 内核参数
对于主动发起连接的一方，可以设置内核参数 `net.ipv4.tcp_tw_reuse = 1` 复用处于 `TIME_WAIT` 状态的连接，内核会在以下两个条件满足的情况下复用连接。
- 新连接的时间戳大于之前的连接
- 新连接的 `SYN` 包的序列号和之前连接的序列号没有冲突

### 2.2 tcp_max_tw_buckets 内核参数
内核参数 `net.ipv4.tcp_max_tw_buckets` 用于设置系统最大 `TIME_WAIT` 状态连接的数量，超过该数量的连接会被立即回收。通过适当减少该内核参数的取值，可以减少处于 `TIME_WAIT` 状态的连接的数量。

### 2.3 tcp_fin_timeout 内核参数
内核参数 `net.ipv4.tcp_fin_timeout` 用于设置连接处于`FIN_WAIT_2`状态的时间，通过通过适当减少该内核参数的取值，可以减少连接进入 `CLOSED` 状态的时间，进而减少处于 `TIME_WAIT` 状态的连接的数量。

该方法本质上不是减少 `TIME_WAIT` 状态的连接。

### 2.4 tcp_tw_recycle 内核参数
内核参数 `net.ipv4.tcp_tw_recycle = 1` 用于快速回收处于 `TIME_WAIT` 状态的连接，在NAT网络中，可能会造成连接问题。

之前的文章[序列号回绕问题](https://hellobug0.github.io/tcp/%E5%BA%8F%E5%88%97%E5%8F%B7%E5%9B%9E%E7%BB%95%E9%97%AE%E9%A2%98)中，介绍了PAWS机制，当开启了 `tcp_tw_recycle` ，PAWS在判断数据包所属的连接时，不再使用TCP四元组判断唯一一个连接，而是根据源IP地址判断，只要源IP地址相同，一旦发现发送该包的时间戳不是更新的，直接丢弃。此时的PAWS实际为 `Per-host PAWS` 。

在NAT网络中，多个客户端使用同一个源IP地址，如果其中某个客户端的时间戳比实际的时间满，就会导致该客户端发送的包被丢弃，客户端无法正常访问服务。

`tcp_tw_recycle` 内核参数在 `Linux4.12` 内核中被移除，生产环境中不建议使用该内核参数。


注意：`TIME_WAIT` 状态对连接的可靠性非常重要，盲目快速回收可能会造成连接异常和数据包错乱。
