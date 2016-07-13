#!/bin/bash
set -e

DIR="$(dirname "${BASH_SOURCE}")"

# REGISTRY_SERVER 支持多个地址，以 , 分割，例如 index.qiniu.com,index.example.com

if [[ $REGISTRY_SERVER == "" ]]; then
  echo "REGISTRY_SERVER is required env var"
  exit 1
fi

PUBLIC_LIBRARY='library'

for d in `ls $DIR` ; do
	if [ -d $d ] ; then
		cd $d
		reponame=${PWD##*/}
		for dockerfile in `ls *.Dockerfile` ; do
			if [ "$1" != "" -a $reponame != "$1" ]; then
				continue
			fi
			version="${dockerfile%.*}"
			echo "------------------------------------------"
			echo " processing $reponame:$version"
			echo "------------------------------------------"
			echo

			from=`grep "FROM" $dockerfile | cut -d" " -f2`
			echo "<<<< docker pull $from"
			docker pull $from

			echo "==== build repo"
			docker build -t "registry.tmp/$PUBLIC_LIBRARY/$reponame:$version" --rm -f $dockerfile ./
			for dest in `echo $REGISTRY_SERVER | tr ',' '\n'`;do
				echo ">>>> tag and push to $dest"
				docker tag "registry.tmp/$PUBLIC_LIBRARY/$reponame:$version" "$dest/$PUBLIC_LIBRARY/$reponame:$version"
				docker push "$dest/$PUBLIC_LIBRARY/$reponame:$version"
				docker rmi "$dest/$PUBLIC_LIBRARY/$reponame:$version"
			done
			docker rmi "registry.tmp/$PUBLIC_LIBRARY/$reponame:$version"
		done
		cd ..
	fi
done
