#!/bin/bash
set -e

DIR="$(dirname "${BASH_SOURCE}")"

# REGISTRY_SERVER 支持多个地址，以 , 分割，例如 index.qiniu.com,index.example.com

if [[ "$REGISTRY_SERVER" == "" ]]; then
   echo "REGISTRY_SERVER is empty, build local images registry.tmp/* only"
fi

PUBLIC_LIBRARY='library'

for d in `ls $DIR`; do

    reponame=${d##*/}
    if [ "$1" != "" -a $reponame != "$1" ]; then
        echo "---- skip $reponame due to \$1=$1"
        continue
    fi

    if [ -d $d ] ; then
        cd $d
        echo "---------------------------------"
        echo " build $reponame                 "
        echo "---------------------------------"
        if [ -f ./pre-build.sh ]; then
            echo "++++ process $reponame/pre-build.sh        "
            ./pre-build.sh
        fi

        for dockerfile in `ls *.Dockerfile` ; do
            version="${dockerfile%.*}"
            echo "++++ process $reponame:$version"
            from=`grep "FROM" $dockerfile | cut -d" " -f2`
            echo "<<<< step1. docker pull $from"
            docker pull $from
            echo "==== step2. docker build -f $dockerfile"
            docker build -t "registry.tmp/$PUBLIC_LIBRARY/$reponame:$version" --rm -f $dockerfile ./
            for dest in `echo $REGISTRY_SERVER | tr ',' '\n'`;do
                echo ">>>> step3. docker tag and push to $dest"
                docker tag "registry.tmp/$PUBLIC_LIBRARY/$reponame:$version" "$dest/$PUBLIC_LIBRARY/$reponame:$version"
                docker push "$dest/$PUBLIC_LIBRARY/$reponame:$version"
                docker rmi "$dest/$PUBLIC_LIBRARY/$reponame:$version"
            done
            if [[ "$REGISTRY_SERVER" != "" ]]; then
                echo "==== step4. cleanup $reponame:$version"
                docker rmi "registry.tmp/$PUBLIC_LIBRARY/$reponame:$version"
            fi
        done
        cd ..
    fi
done
