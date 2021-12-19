import { useCallback, useLayoutEffect } from 'react'
import Quagga from '@ericblade/quagga2'
import {QuaggaJSResultCallbackFunction} from "@ericblade/quagga2/type-definitions/quagga"

function getMedian(arr: any[]) {
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) {
        return arr[half];
    }
    return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes: any[]) {
    const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error)
    const medianOfErrors = getMedian(errors)
    return medianOfErrors
}

const defaultConstraints = {
    width: 300,
    height: 300,
};

const defaultLocatorSettings = {
    patchSize: 'medium',
    halfSample: true,
}

const defaultDecoders = ['ean_reader'];

type Props = {
  onDetected: (code: string) => void,
  scannerRef: any,
  onScannerReady?: () => void,
  cameraId?: string,
  facingMode?: string,
}

const Scanner = (props: Props) => {
  const {onDetected, scannerRef, onScannerReady, cameraId, facingMode} = props
  const constraints = defaultConstraints
  const locator = defaultLocatorSettings
  const numOfWorkers = navigator.hardwareConcurrency || 0
  const decoders = defaultDecoders
  const locate = true
  const errorCheck: QuaggaJSResultCallbackFunction = useCallback((result) => {
      if (!onDetected) {
          return
      }
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      // if Quagga is at least 75% certain that it read correctly, then accept the code.
      if (err < 0.25) {
          if (result.codeResult.code) onDetected(result.codeResult.code)
      }
  }, [onDetected]);

  const handleProcessed: QuaggaJSResultCallbackFunction = (result) => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;
      drawingCtx.font = "24px Arial";
      drawingCtx.fillStyle = 'green';

      if (result) {
        // console.warn('* quagga onProcessed', result);
        if (result.boxes) {
          // @ts-ignore
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')));
          result.boxes.filter((box) => box !== result.box).forEach((box) => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: 'purple', lineWidth: 2 });
          });
        }
        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: 'blue', lineWidth: 2 });
        }
        if (result.codeResult && result.codeResult.code) {
            // const validated = barcodeValidator(result.codeResult.code);
            // const validated = validateBarcode(result.codeResult.code);
            // Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: validated ? 'green' : 'red', lineWidth: 3 });
            drawingCtx.font = "24px Arial";
            // drawingCtx.fillStyle = validated ? 'green' : 'red';
            // drawingCtx.fillText(`${result.codeResult.code} valid: ${validated}`, 10, 50);
            drawingCtx.fillText(result.codeResult.code, 10, 20);
            // if (validated) {
            //     onDetected(result);
            // }
        }
    }
  };

  useLayoutEffect(() => {
      Quagga.init({
          inputStream: {
              type: 'LiveStream',
              constraints: {
                  ...constraints,
                  ...(cameraId && { deviceId: cameraId }),
                  ...(!cameraId && { facingMode }),
              },
              target: scannerRef.current,
          },
          locator,
          numOfWorkers,
          decoder: { readers: decoders },
          locate,
      }, (err) => {
          Quagga.onProcessed(handleProcessed);

          if (err) {
              return console.log('Error starting Quagga:', err);
          }
          if (scannerRef && scannerRef.current) {
              Quagga.start();
              if (onScannerReady) {
                  onScannerReady();
              }
          }
      });
      Quagga.onDetected(errorCheck)
      return () => {
          Quagga.offDetected(errorCheck);
          Quagga.offProcessed(handleProcessed);
          Quagga.stop();
      };
  }, [cameraId, onDetected, onScannerReady, scannerRef, errorCheck, constraints, locator, decoders, locate, facingMode, numOfWorkers]);
  return null
}

export default Scanner;