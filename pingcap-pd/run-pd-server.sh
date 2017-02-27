#!/bin/sh

set -e

# Adapt to KIRK runtime
# 1. Auto fetch container IP
# 2. Use ENV to pass args with stack_name
#     args_name="pd1"
#     args_client_port="2379"
#     args_peer_port="2380"
#     args_initial="pd1=http://pd1.default:2380,pd2=http://pd2.default:2380,pd3=http://pd3.default:2380"

echo "name = ${args_name}, client_port = ${args_client_port}, peer_port = ${args_peer_port}, initial = ${args_initial}"

IP=`hostname -i`
./pd-server --name=${args_name} --data-dir=/data/${args_name} \
  --client-urls=http://${IP}:${args_client_port} \
  --peer-urls=http://${IP}:${args_peer_port} \
  --initial-cluster=${args_initial}
