#!/bin/bash

pods=$(kubectl get pod -l "app=gunicorn" -o name)

for pod in ${pods}; do
    name=`echo $pod | sed 's/pod\///'`
    echo "Updating ${name}"
    kubectl cp main ${name}:/tator_online
    kubectl cp tator_online ${name}:/tator_online
done

# Run collect static on one of them
kubectl exec -it $(kubectl get pod -l "app=gunicorn" -o name | head -n 1 |sed 's/pod\///') -- python3 manage.py collectstatic --noinput
