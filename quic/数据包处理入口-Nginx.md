**ngx_event_process_init**    工作进程创建之后，调用该函数
    遍历所有的监听socket，将socket上的读事件的处理函数设置为`ngx_quic_recvmsg`
    ```C
#if (NGX_QUIC)
        } else if (ls[i].quic) {
            rev->handler = ngx_quic_recvmsg;
#endif
```

**ngx_quic_recvmsg**
    ngx_connection_t *c = ngx_get_connection(lc->fd, ev->log); lc->fd为服务端的socket
    调用ngx_http_init_connection
    
**ngx_http_init_connection**
    ngx_http_connection_t *hc 申请
    c->data = hc;
    c->read->handler = ngx_http_wait_request_handler
    c->write->handler = ngx_http_empty_handler
    ```C
#if (NGX_HTTP_V3)
    if (hc->addr_conf->quic) {
        ngx_http_v3_init_stream(c);
        return;
    }
#endif
```
    
**ngx_quic_run** 
    处理QUIC数据包
