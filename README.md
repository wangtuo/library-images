### 镜像提交规范

- 每个镜像使用一个独立的目录

    ```
    library-images/ubuntu/
    ├── start.sh    # 构建需要的文件
    ├── ...
    ├── latest.Dockerfile -> 14.04.Dockerfile # 多项Dockerfile
    ├── 12.04.Dockerfile
    └── 14.04.Dockerfile
    ```

- 每个镜像目录中可以包含多个 `Dockerfile` 文件，文件名如 `<tag>.Dockerfile`。`latest.Dockerfile` 是指向某个具体版本的软链接。
- 对于一些官方镜像不指定命令创建容器无法持续运行的情况，可以新增一个启动时候的入口程序，参考 `ubuntu/start.sh` 文件的写法。

### 构建流程

- `[ library-images ]$ REGISTRY_SERVER=dest.example.com ./build-images.sh` 构建并推送镜像，需事先登录 `docker login dest.example.com`
- 官方镜像参考：[https://github.com/docker-library/official-images](https://github.com/docker-library/official-images)


