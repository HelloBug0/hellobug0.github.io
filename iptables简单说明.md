## iptables简单说明
网卡驱动将接收到的原始比特流组装成帧，将帧数据从网卡缓冲区复制到内核主存中。
内核协议栈解析以太网帧，然后处理IP数据报、TCP端/UDP数据报，将应用数据流放入对应的Socket接收队列，等待应用程序通过系统调用读取。

内核协议栈处理数据包的过程类似于一条流水线，在流水线的五个关键位置预设了钩子（Hook），可以通过iptables在这五个位置设置一些规则。
这五个位置分别为：
- PREROUTING：数据包进入后，路由判断之前
- INPUT：路由判断后，确认数据包是发送给本机的
- FORWARD：路由判断后，确认数据包需要被本机转发
- OUTPUT：本机进程产生的数据包，在发送出去之前
- POSTROUTING：所有数据包离开本机之前

并不是每个数据包都会经历这五个位置，根据数据包的流向，主要有三种情况：
发往本机：PREROUTING->INPUT->本机应用程序
本机路由：PREROUTING->FORWARD->POSTROUTING
本机发出：本机应用程序->OUTPUT->POSTROUTING

每个链中都有不同的表，总共有四种表，优先级从高到低依次为：raw、mangle、nat、filter。
并不是每个位置（链）都有这四种表。

iptables规则匹配顺序：

PREROUTING链：raw表 (PREROUTING链) -> mangle表 (PREROUTING链) -> nat表 (PREROUTING链)
INPUT 链：mangle表 (INPUT链) -> nat表 (INPUT链) -> filter表 (INPUT链)
...
表内顺序匹配规则，匹配到即停止。
