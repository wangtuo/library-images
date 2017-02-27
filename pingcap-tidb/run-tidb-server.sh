#!/bin/sh

set -e

# Adapt to KIRK runtime
# 1. Auto fetch container IP
# 2. Use ENV to pass args with stack_name
#     args_path="pd1.default:2379,pd2.default:2379,pd3.default:2379"

echo "pd_path = ${args_path}"
./tidb-server --store=tikv --path=$args_path
