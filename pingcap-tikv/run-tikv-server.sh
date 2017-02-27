#!/bin/sh

set -e

# Adapt to KIRK runtime
# 1. Auto fetch container IP
# 2. Use ENV to pass args with stack_name
#     args_port="20160"
#     args_name="tikv1"
#     args_pd="pd1.default:2379,pd2.default:2379,pd3.default:2379"

echo "pd_path = ${args_pd}, name = ${args_name}, port = ${args_port}"

IP=`hostname -i`
./tikv-server --store=/data/${args_name} --pd=${args_pd} --addr=${IP}:${args_port}
