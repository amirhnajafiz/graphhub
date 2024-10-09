# GraphHub

GraphHub is my personal website in which I keep my notes. I created it using Docusaurus.

## Build an run

To run this website on your local-machine, you can use the following command to start the react app on a docker container port `80`.

```sh
docker run -it $(docker build -q ./app -f ./build/Dockerfile)
```

## Target directories

List of the directories that I should move their content to GraphHub.

- NWOS-Notebook
- OS
- Kubernetes
- Ceph
