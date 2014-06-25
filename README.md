Google API Node.js CommandLine
====

## Install

```
npm install gapis -g
```

## Prepare

Current support service account only
1. Apply the service account
2. Convert your key and edit gservice.js for jwt auth

## Use

Ex: compute engine image list

```
gcli -a compute -v v1 \
  -s "https://www.googleapis.com/auth/compute" \
  -s "https://www.googleapis.com/auth/compute.readonly" \
  -f compute.images.list \
  -d project=mitac-cp300 
```

Ex2: bigquery job query

```
./bin/gcli -a bigquery -v v2 \
  -s "https://www.googleapis.com/auth/bigquery" \
  -s "https://www.googleapis.com/auth/bigquery.readonly" \
  -f bigquery.jobs.query \
  -d projectId=mitac-cp300 \
  -b "query=select * from test.user2" 
```


## Use environment as default input

You can also use the following environment as default input

```
export GCP_API=compute
export GCP_API_VERSION=v1
export GCP_API_SCOPES=https://www.googleapis.com/auth/compute,https://www.googleapis.com/auth/compute.readonly
export GCP_PROJECT=mitac-cp300
```

Then...

```
gcli -d project=mitac-cp300 -f compute.images.list
```
