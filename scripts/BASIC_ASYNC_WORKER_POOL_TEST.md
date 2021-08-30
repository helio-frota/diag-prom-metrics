# Basic sync test

```
delta --side-by-side app/metrics_basic_sync_2.txt app/metrics_basic_sync_3.txt
```

```
| 1  │# HELP process_cpu_user_seconds_total Total user CPU time spent in seco→│ 1  │# HELP process_cpu_user_seconds_total Total user CPU time spent in seco→
│ 2  │# TYPE process_cpu_user_seconds_total counter                           │ 2  │# TYPE process_cpu_user_seconds_total counter
│ 3  │process_cpu_user_seconds_total 1.046727                                 │ 3  │process_cpu_user_seconds_total 7.488392
│ 4  │                                                                        │ 4  │
│ 5  │# HELP process_cpu_system_seconds_total Total system CPU time spent in →│ 5  │# HELP process_cpu_system_seconds_total Total system CPU time spent in →
│ 6  │# TYPE process_cpu_system_seconds_total counter                         │ 6  │# TYPE process_cpu_system_seconds_total counter
│ 7  │process_cpu_system_seconds_total 0.030133                               │ 7  │process_cpu_system_seconds_total 0.148002
│ 8  │                                                                        │ 8  │
│ 9  │# HELP process_cpu_seconds_total Total user and system CPU time spent i→│ 9  │# HELP process_cpu_seconds_total Total user and system CPU time spent i→
│ 10 │# TYPE process_cpu_seconds_total counter                                │ 10 │# TYPE process_cpu_seconds_total counter
│ 11 │process_cpu_seconds_total 1.07686                                       │ 11 │process_cpu_seconds_total 7.636394


│ 45 │# HELP nodejs_eventloop_lag_max_seconds The maximum recorded event loop→│ 45 │# HELP nodejs_eventloop_lag_max_seconds The maximum recorded event loop→
│ 46 │# TYPE nodejs_eventloop_lag_max_seconds gauge                           │ 46 │# TYPE nodejs_eventloop_lag_max_seconds gauge
│ 47 │nodejs_eventloop_lag_max_seconds 0.066027519                            │ 47 │nodejs_eventloop_lag_max_seconds 0.088080383
```
