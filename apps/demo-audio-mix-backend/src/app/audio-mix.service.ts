import * as path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { BadRequestException, Logger } from "@nestjs/common";
import { MixAudioResponseDto } from "./response/mix-audio.response.dto";
import { AudioMixEditDto } from "./request/AudioMixEditDto";

const execute = promisify(exec);

export class AudioMixService {
  private readonly log = new Logger(AudioMixService.name);

  async mixAudio(
    audio: Express.Multer.File,
    audioEffect: AudioMixEditDto,
  ): Promise<MixAudioResponseDto> {
    const pathToAudioMix = path.join(__dirname, 'assets', `${audioEffect.effect}-${audioEffect.version}.aac`);

    this.log.log(`Start audio mixing...`);
    const outputFilename = Date.now() + '.aac';
    const { stderr } = await execute(
      `ffmpeg -i ${audio.path} -i ${pathToAudioMix} -filter_complex \
      "[0:0]volume=1.5[a0]; \
      [1:0]volume=0.4[a1]; \
      [a0][a1]amix=inputs=2:duration=first:dropout_transition=4[out]" \
      -map "[out]" "./uploads/${outputFilename}" -loglevel error`,
    );

    this.log.log(`Finish audio mixing...`);

    if (stderr) {
      this.log.error(stderr);
      throw new BadRequestException(stderr);
    }

    return {
      audioLink: `https://demo-audio-mix.anyvoice.app/uploads/${outputFilename}`
    }
  }
}
