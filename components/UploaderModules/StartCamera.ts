import { css, jsx } from '@emotion/react';

/**
 * カメラ起動
 * @param {string} action
 * action === take 写真を撮る
 */
export const StartCamera = async (action) => {
  if (action === 'close') {
    return
  }

  const camera = document.getElementById('camera') as HTMLVideoElement;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (action === 'take') {
    camera.pause();
    return
  }

  const mediaStream = await navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        width: window.outerWidth,
        height: window.innerHeight
      }
    }).then((stream) => {
      camera.srcObject = stream;
      camera.play();

      const draw = () =>{
        ctx.drawImage(camera, 0, 0);
      }

      setInterval(draw, 100);
    });

  console.log(mediaStream);
};

export const CameraImageStyle = css`
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const CameraButtonStyle = css`
  position: fixed;
  background-color: #fff;
  bottom: 10%;
  left: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: fixed;
    bottom: calc(10% + 5px);
    left: 0;
    right: 0;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin: auto;
    background-color: #000;
  }

  &::after {
    width: 86px;
    height: 86px;
    bottom: calc(10% + 5px + 2px);
    background-color: #fff;
  }
`;

export const CameraCloseButtonStyle = css`
  position: fixed;
  right: 0;
  top: 0;
  width: 48px;
  height: 48px;
  fill: #fff;
  margin-top: 24px;
  margin-right: 24px;
`
