FROM centos:latest

RUN yum update -y
RUN yum install -y python3-devel python3-pip mesa-libGL gcc gcc-c++ freetype freetype-devel libpng-devel make
RUN pip3 install --upgrade pip setuptools
RUN pip3 install opencv-python opencv-contrib-python numpy pandas jupyterlab torch torchvision scikit-learn
RUN pip3 install matplotlib
