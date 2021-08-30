#!/bin/bash

# 10 concurrent users one time each user on the crypto sync endpoint.
siege -q -c10 -r1 http://localhost:8080/c_sync
# exports metrics file
siege -q -c1 -r1 http://localhost:8080/metrics?test=basic_sync
sleep 2

# 100 concurrent users 2 times each user on the crypto sync endpoint.
siege -q -c100 -r2 http://localhost:8080/c_sync
# exports metrics file
siege -q -c1 -r1 http://localhost:8080/metrics?test=basic_sync
sleep 2

# 200 concurrent users 5 times each user on the crypto sync endpoint.
siege -q -c200 -r5 http://localhost:8080/c_sync
# exports metrics file
siege -q -c1 -r1 http://localhost:8080/metrics?test=basic_sync
