// Import the SuperpoweredWebAudio helper to allow us to extend the SuperpoweredWebAudio.AudioWorkletProcessor class
import { SuperpoweredWebAudio } from "../superpowered/SuperpoweredWebAudio.js";

class NoiseProcessor extends SuperpoweredWebAudio.AudioWorkletProcessor {
  // Runs after the constructor
  onReady() {
    // Create an instance of a SP generator class
    this.generator = new this.Superpowered.Generator(
      this.samplerate, // The initial sample rate in Hz.
      this.Superpowered.Generator.PinkNoise // The initial shape.
    );

    // Pass an event object over to the main scope to tell it everything is ready
    this.sendMessageToMainScope({ event: "ready" });
  }

  // onDestruct is called when the parent AudioWorkletNode.destruct() method is called.
  // You should clear up all SP class instances here.
  onDestruct() {
    this.generator.destruct();
  }

  processAudio(inputBuffer, outputBuffer, buffersize, parameters) {
    this.generator.generate(
      outputBuffer.pointer, // output, // Pointer to floating point numbers. 32-bit MONO output.
      buffersize * 2 // ? not true - we multiple this by two becuase .generate returns a monto signal whereas the outputBuffer is interleaved stereo.
    );
  }
}

// The following code registers the processor script in the browser, notice the label and reference
if (typeof AudioWorkletProcessor !== "undefined")
  registerProcessor("NoiseProcessor", NoiseProcessor);
export default NoiseProcessor;
