import {Controller, Get, Patch, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {AudioMixService} from "./audio-mix.service";
import {MixAudioResponseDto} from "./response/mix-audio.response.dto";

@Controller('audio/mix')
export class AudioMixController {

  constructor(
    private readonly service: AudioMixService
  ) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  mixAudio(
    @UploadedFile() audio: Express.Multer.File
  ): Promise<MixAudioResponseDto> {
    return this.service.mixAudio(audio);
  }
}
